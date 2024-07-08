'use server';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

export async function register(values: z.infer<typeof LoginSchema>) {
	const validatedFields = LoginSchema.safeParse(values);
	const { async } = validatedFields.data;
}
