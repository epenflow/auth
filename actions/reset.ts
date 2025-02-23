'use server';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas';
import * as z from 'zod';
export async function reset(value: z.infer<typeof ResetSchema>) {
	const validatedFields = ResetSchema.safeParse(value);

	if (!validatedFields.success) {
		return { error: 'Invalid email!' };
	}
	const { email } = validatedFields.data;
	const existingUser = await getUserByEmail(email);
	if (!existingUser) {
		return { error: 'Email not found!' };
	}
	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);
	return { success: 'Reset email sent!' };
}
