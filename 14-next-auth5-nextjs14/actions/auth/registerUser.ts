'use server';

import { sendVerificationEmail } from '@/components/email';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { hashPassword } from '@/lib/hashing';
import { AC, ActionError } from '@/lib/safe-action';
import { registerSchema } from '@/lib/schemas/auth';
import { sleep } from '@/lib/utils';

export const registerAction = AC.schema(registerSchema).action(
	async ({ parsedInput: { name, email, password } }) => {
		await sleep(500);
		const existingUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});
		if (existingUser) {
			throw new ActionError('User already exists');
		}
		const hashedPassword = await hashPassword(password);
		await db.insert(users).values({
			name,
			email,
			password: hashedPassword
		});

		// send verification email
		const { data, error } = await sendVerificationEmail(email);
		if (error) throw new ActionError('Error while sending verification email');

		return {
			message: 'Verification email sent'
		};
	}
);
