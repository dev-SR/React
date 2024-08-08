'use server';

import { db } from '@/db';
import { Todo } from '@/db/pg-schema';
import { addTaskSchema, TAddTaskSchema } from '@/lib/formSchema';
import { AC, ActionError } from '@/lib/safe-action';
// import { ZodIssue } from 'zod';
// export type ActionResult<T> =
// 	| {
// 			status: 'success';
// 			data: T;
// 	  }
// 	| {
// 			status: 'error';
// 			error: string | ZodIssue[];
// 	  };

/* export async function createTask(data: TAddTaskSchema): Promise<ActionResult<TAddTaskSchema>> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const validation = addTaskSchema.safeParse(data);
		if (!validation.success) {
			return {
				status: 'error',
				error: validation.error.errors
			};
		}
		const taskExists = await db.query.Todo.findFirst({
			where: (Todo, { eq }) => eq(Todo.title, data.title)
		});

		if (taskExists) {
			return {
				status: 'error',
				error: 'Task already exists'
			};
		}

		const [task] = await db.insert(Todo).values(validation.data).returning({
			id: Todo.id,
			title: Todo.title
		});

		return {
			status: 'success',
			data: task
		};
	} catch (e) {
		return {
			status: 'error',
			error: 'Something went wrong'
		};
	}
} */

export const createTask = AC.schema(addTaskSchema).action(async ({ parsedInput }) => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const taskExists = await db.query.Todo.findFirst({
		where: (Todo, { eq }) => eq(Todo.title, parsedInput.title)
	});

	if (taskExists) {
		throw new ActionError('Task already exists');
	}

	const [task] = await db.insert(Todo).values(parsedInput).returning({
		id: Todo.id,
		title: Todo.title
	});

	return task;
});
