'use server';
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getResetPasswordTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
export async function newPassword(
	values: z.infer<typeof NewPasswordSchema>,
	token: string | null
) {
	if (!token) {
		return { error: 'Missing token' };
	}
	const validatedFields = NewPasswordSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}
	const { password } = validatedFields.data;
	const existingToken = await getResetPasswordTokenByToken(token);
	if (!existingToken) {
		return { error: 'Invalid token!' };
	}
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: 'Token has expired' };
	}
	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: 'Email does not exist!' };
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});
	return { success: 'Password updated!' };
}
