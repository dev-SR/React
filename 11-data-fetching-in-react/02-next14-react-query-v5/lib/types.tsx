export type Post = {
	id: number;
	userId: number;
	title: number;
	body: number;
};

import { z } from 'zod';
export const formSchema = z.object({
	title: z.string().min(1),
	body: z.string().min(1)
});
export type CreatePost = z.infer<typeof formSchema>;
export type ISuccessResponse = {
	message: string;
};
export type MyErrorResponse = {
	error_message: string;
};
