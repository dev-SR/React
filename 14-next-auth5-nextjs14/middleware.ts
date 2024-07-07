import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

const authRoute = ['/auth/login', '/auth/register'];
const privateRoute = ['/admin'];

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = Boolean(req.auth);
	const isAuthRoute = authRoute.includes(nextUrl.pathname);
	const isPrivateRoute = privateRoute.includes(nextUrl.pathname);

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL('/dashboard', nextUrl)); // prevent from going to auth pages when logged in already
		}
		return NextResponse.next();
	}

	if (isPrivateRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/auth/login', nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
