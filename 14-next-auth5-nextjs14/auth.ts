import NextAuth, { AuthError } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/drizzle';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/schemas/auth';
import { comparePassword } from './lib/hashing';
import authConfig from './auth.config';
import { sendVerificationEmail } from './components/email';

export class MyAuthError extends AuthError {
	my_message: string;
	constructor(message: string) {
		super(message, {});
		this.my_message = message;
		this.type = 'CredentialsSignin';
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	...authConfig,
	providers: [
		GitHub,
		Credentials({
			name: 'credentials',

			async authorize(creds) {
				const validated = loginSchema.safeParse(creds);
				if (validated.success) {
					const { email, password } = validated.data;
					const user = await db.query.users.findFirst({
						where: (users, { eq }) => eq(users.email, email)
					});

					if (!user) {
						throw new MyAuthError('Invalid credentials');
					}

					if (!(await comparePassword(password, String(user.password)))) {
						throw new MyAuthError('Invalid credentials');
					}
					if (!user.emailVerified) {
						// send verification email
						const { data, error } = await sendVerificationEmail(email);

						if (error) {
							throw new MyAuthError(
								'Your account is not verified. We could not send verification email. Please try again later.'
							);
						}

						throw new MyAuthError(
							'Your account is not verified. Check your email for verification link.'
						);
					}

					return user;
				}

				return null;
			}
		})
	]
});
