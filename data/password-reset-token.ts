import { db } from '@/lib/db';

export async function getResetPasswordTokenByToken(token: string) {
	try {
		const passwordResetToken = await db.passwordResetToken.findUnique({
			where: { token },
		});
		return passwordResetToken;
	} catch {
		return null;
	}
}
export async function getResetPasswordTokenByEmail(email: string) {
	try {
		const passwordResetEmail = await db.passwordResetToken.findFirst({
			where: { email },
		});
		return passwordResetEmail;
	} catch {
		return null;
	}
}
