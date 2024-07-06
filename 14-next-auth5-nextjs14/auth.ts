import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/drizzle';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	providers: [GitHub]
});
