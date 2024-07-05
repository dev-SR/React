import { z } from 'zod';

export const addTaskSchema = z.object({
	title: z
		.string()
		.max(255, { message: 'Title should be less than 255 characters' })
		.min(3, { message: 'Title should be more than 3 characters' }),
	description: z.string().optional()
});

export type TAddTaskSchema = z.infer<typeof addTaskSchema>;
