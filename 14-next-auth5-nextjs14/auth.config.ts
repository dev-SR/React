// THIS AUTH-OPTION should not import database or will not work for middleware.ts
import type { NextAuthConfig } from 'next-auth';
export default {
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	},
	providers: []
} satisfies NextAuthConfig;
