import { InferModel } from 'drizzle-orm';
import { pgTable, pgEnum, varchar, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

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
