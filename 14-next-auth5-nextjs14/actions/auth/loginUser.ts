'use server';

import { signIn } from '@/auth';
import { AC, ActionError } from '@/lib/safe-action';
import { loginSchema } from '@/lib/schemas/auth';
import { sleep } from '@/lib/utils';
import { AuthError } from 'next-auth';

export const loginAction = AC.schema(loginSchema).action(
	async ({ parsedInput: { email, password } }) => {
		await sleep(500);

		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false
			});
		} catch (error) {
			if (error instanceof AuthError) {
				throw new ActionError(error.message.split('.')[0] || 'Something went wrong');
			}
			throw error;
		}

		return {
			message: 'User logged in successfully'
		};
	}
);
