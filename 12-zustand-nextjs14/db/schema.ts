import { pgTable, pgEnum, uuid, text, timestamp, decimal } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin', 'guest']);

export const Product = pgTable('product', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('name').notNull(),
	description: text('description'),
	price: decimal('price').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
