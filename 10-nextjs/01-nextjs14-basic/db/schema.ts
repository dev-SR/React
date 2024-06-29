import { pgTable, pgEnum, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin', 'guest']);

export const User = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: text('email'),
	password: text('password'),
	role: roleEnum('role').default('user').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
