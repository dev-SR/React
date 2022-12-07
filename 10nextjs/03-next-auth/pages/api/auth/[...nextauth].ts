import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@libs/prisma';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'database',
		maxAge: 60 * 60 * 24 * 30, // 30 days
		updateAge: 60 * 60 * 24 // 1 day
	},
	useSecureCookies: process.env.NODE_ENV === 'production', // NO HTTPS on localhost
	debug: false,
	events: {},
	pages: {
		signIn: '/auth/signin'
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},

		async session({ session, user }) {
			if (session?.user) session.user.id = user.id;
			return session;
		}
	}
};
export default NextAuth(authOptions);
