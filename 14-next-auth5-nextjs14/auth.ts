import NextAuth, { AuthError } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/drizzle';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/schemas/auth';
import { comparePassword } from './lib/hashing';
import authConfig from './auth.config';

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
						throw new AuthError('User not found');
					}

					if (!(await comparePassword(password, String(user.password)))) {
						throw new AuthError('Invalid credentials');
					}
					// console.log(user);

					return user;
				}

				return null;
			}
		})
	]
});
