import { relations } from 'drizzle-orm';
import {
	pgTable,
	pgEnum,
	varchar,
	uuid,
	text,
	timestamp,
	boolean,
	real,
	AnyPgColumn
} from 'drizzle-orm/pg-core';
import { DEFAULT_SERIF_FONT } from 'next/dist/shared/lib/constants';

// Define an enum for the status of the todo item
export const TodoStatus = pgEnum('todo_status', ['pending', 'in_progress', 'completed']);

export const Todo = pgTable('todo', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	status: TodoStatus('status').default('pending'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	completed: boolean('completed').default(false)
});

export type TodoType = typeof Todo.$inferSelect;

// CATEGORY
export const category = pgTable('category', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('title').notNull().unique(),
	//  category self reference
	parent_id: uuid('parent_id')
		.notNull()
		.references((): AnyPgColumn => category.id, { onDelete: 'set null' })
});

export const categoryRelations = relations(category, ({ one, many }) => ({
	parent: one(category, {
		//reference table
		fields: [category.parent_id], // own column
		references: [category.id] //reference column
	}),
	children: many(category),
	product: many(product),
	options: many(category_options)
}));

// CATEGORY OPTIONS
export const category_options = pgTable('category_options', {
	id: uuid('id').primaryKey().defaultRandom(),
	option_name: text('option_name').notNull(),
	category_id: uuid('category_id')
		.notNull()
		.references(() => category.id, { onDelete: 'cascade' })
});

export const category_optionsRelations = relations(category_options, ({ many, one }) => ({
	category: one(category, {
		fields: [category_options.id],
		references: [category.id]
	})
	// option_values: many(category_option_values)
}));

// // CATEGORY OPTIONS VALUE
// export const category_option_values = pgTable('category_option_values', {
// 	id: uuid('id').primaryKey().defaultRandom(),
// 	value: text('value'),
// 	cat_option_id: uuid('cat_option_id')
// 		.notNull()
// 		.references(() => category.id, {
// 			onDelete: 'cascade'
// 		})
// });

// export const category_option_valuesRelations = relations(category_option_values, ({ one }) => ({
// 	category_option: one(category_options, {
// 		fields: [category_option_values.cat_option_id],
// 		references: [category_options.id]
// 	})
// }));

// PRODUCT
export const ProdWeightMetrics = pgEnum('weight_metrics', ['gm', 'kg', 'lb']);
export const ProdPhysicalDescription = pgEnum('physical_description', ['physical', 'digital']);
export const ProdStatus = pgEnum('prod_status', ['active', 'inactive', 'discontinue']);

export const product = pgTable('product', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	selling_price: real('selling_price').notNull(),
	dummy_compare_at_price: real('dummy_compare_at_price'),
	cost: real('cost').notNull(),
	quantity: real('quantity').notNull(),
	sku: varchar('sku', { length: 255 }),
	barcode: varchar('barcode', { length: 225 }),
	status: ProdStatus('status').default('active'),
	weight: real('weight'),
	weight_metrics: ProdWeightMetrics('weight_metrics').default('gm'),
	international_shipment: boolean('international_shipment').default(false),
	physical_description: ProdPhysicalDescription('physical_description').default('physical')
});
export const productsRelation = relations(product, ({ many, one }) => ({
	category: many(category)
}));

// PRODUCT <m> CATEGORY
export const productToCategory = pgTable('productToCategory', {
	product_id: uuid('product_id')
		.notNull()
		.references(() => product.id, { onDelete: 'cascade' }),
	category_id: uuid('category_id')
		.notNull()
		.references(() => category.id, { onDelete: 'cascade' })
});

export const productCategoryRelations = relations(productToCategory, ({ one }) => ({
	product: one(product, {
		//reference table
		fields: [productToCategory.product_id], // own column
		references: [product.id] //reference column
	}),
	category: one(category, {
		fields: [productToCategory.category_id],
		references: [category.id]
	})
}));

// PRODUCT OPTIONS
export const product_options = pgTable('product_options', {
	product_id: uuid('product_id')
		.notNull()
		.references(() => product.id, { onDelete: 'cascade' }),
	cat_option_id: uuid('cat_option_id')
		.notNull()
		.references(() => category_options.id, { onDelete: 'cascade' })
});
export const product_optionsRelations = relations(product_options, ({ many, one }) => ({
	product: one(product, {
		//reference table
		fields: [product_options.product_id], // own column
		references: [product.id] //reference column
	}),
	category: one(category_options, {
		fields: [product_options.cat_option_id],
		references: [category_options.id]
	})
}));

//
