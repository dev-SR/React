'use server';

import { MyAuthError, signIn } from '@/auth';
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
				if (error.type == 'CredentialsSignin' && error instanceof MyAuthError) {
					throw new ActionError(error.my_message);
				}
				if (!(error instanceof MyAuthError)) {
					throw new ActionError(error.message.split('.')[0] || 'Something went wrong');
				}
			}
			throw new ActionError('Something went wrong');
		}

		return {
			message: 'User logged in successfully'
		};
	}
);
