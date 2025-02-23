import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
const { auth } = NextAuth(authConfig);
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from './routes';
export default auth((reg): any => {
	const { nextUrl } = reg;
	const isLoggedIn = !!reg.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return null;
	}
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return null;
	}
	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search
		}
		const encodeCallbackUrl = encodeURIComponent(callbackUrl)
		return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeCallbackUrl}`, nextUrl))
	}
	return null
});
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trcp)(.*)'],
};
