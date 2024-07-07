'use server';

import { useRole } from '@/lib/server-hook';
import { Role } from '@prisma/client';

export async function admin() {
	const role = await useRole();
	if (role !== Role.admin) {
		return { error: 'Forbbiden Server Actions!' };
	}
	return { success: 'Allowed Server Actions!' };
}
