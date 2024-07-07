import { useRole } from '@/lib/server-hook';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
	const role = await useRole();
	if (role === Role.admin) {
		return new NextResponse(null, { status: 200 });
	}
	return new NextResponse(null, { status: 403 });
}
