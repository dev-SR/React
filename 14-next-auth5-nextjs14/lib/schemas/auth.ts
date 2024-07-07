import { z } from 'zod';
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5, {
		message: 'Password must be at least 5 characters'
	})
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
	.extend({
		name: z.string().min(3, {
			message: 'Name must be at least 3 characters'
		}),
		confirmPassword: z.string().min(5, {
			message: 'Password must be at least 5 characters'
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
