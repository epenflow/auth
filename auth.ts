import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';
import { getAccountByUserId } from './data/accounts';
declare module '@auth/core/jwt' {
	interface JWT {
		role: 'admin' | 'user';
		isTwoFactorEnabled: boolean;
		email: string;
		isOAuth:boolean;
	}
}
export type ExtendedUser = DefaultSession['user'] & {
	role: 'admin' | 'user';
	isTwoFactorEnabled: boolean;
	email: string;
	isOAuth:boolean;
};
// declare module 'next-auth' {
// 	interface Session {
// 		user: {
// 			role: 'admin' | 'user';
// 			id: string;
// 			image: string;
// 			isTwoFactorEnabled: boolean;
// 		};
// 	}
// }
declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true;
			const existingUser = await getUserById(user.id as string);
			//prevent sign in without email verification
			if (!existingUser?.email) return false;
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation =
					await getTwoFactorConfirmationByUserId(existingUser.id);
				if (!twoFactorConfirmation) return false;
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role;
			}
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.isOAuth = token.isOAuth
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			const existingAccount = await getAccountByUserId(existingUser.id)
			token.isOAuth = !!existingAccount
			token.name = existingUser.name;
			token.email = existingUser.email as string;
			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
			return token;
		},
		
		
	},

	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});
