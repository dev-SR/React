'use server';

import { db } from '@/db/drizzle';
import { EmailVerificationToken, users } from '@/db/schema';
import { AC, ActionError } from '@/lib/safe-action';
import { tokenSchema } from '@/lib/schemas/token';
import { eq } from 'drizzle-orm';

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.query.EmailVerificationToken.findFirst({
			where: eq(EmailVerificationToken.email, email)
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const generateEmailVerificationToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db.delete(EmailVerificationToken).where(eq(EmailVerificationToken.id, existingToken.id));
	}
	const newVerificationTOken = await db
		.insert(EmailVerificationToken)
		.values({
			email,
			token,
			expires
		})
		.returning();

	return newVerificationTOken[0];
};

export const verifyToken = AC.schema(tokenSchema).action(async ({ parsedInput: { token } }) => {
	console.log('******** req ********', new Date());

	const existingToken = await db.query.EmailVerificationToken.findFirst({
		where: eq(EmailVerificationToken.token, token)
	});

	if (!existingToken) throw new ActionError('Invalid token');

	const hasExpired = existingToken.expires < new Date();

	if (hasExpired) throw new ActionError('Token expired');

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, existingToken.email)
	});

	if (!existingUser) throw new ActionError('Email does not exist');

	await db
		.update(users)
		.set({
			emailVerified: new Date()
		})
		.where(eq(users.email, existingToken.email));

	await db.delete(EmailVerificationToken).where(eq(EmailVerificationToken.id, existingToken.id));

	return {
		message: 'Email verified'
	};
});
