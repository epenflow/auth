'use server';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import Navbar from './_components/navbar';

interface LayoutSettingsProps {
	children: React.ReactNode;
}
export default async function ProtectedLayout({
	children,
}: LayoutSettingsProps) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<div className='flex flex-col items-center justify-center w-full h-screen gap-y-10'>
			<Navbar />
				{children}
			</div>
		</SessionProvider>
	);
}
