'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';

interface LoginButtonProps {
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
	children: React.ReactNode;
}
export const LoginButton: React.FC<LoginButtonProps> = ({
	mode = 'redirect',
	asChild,
	children,
}) => {
	const router = useRouter();
	function onClick() {
		router.push('/auth/login');
	}
	if (mode === 'modal') {
		return <Dialog>
			<DialogTrigger asChild={asChild}>
				{children}
			</DialogTrigger>
			<DialogContent className='p-0 w-auto bg-transparent border-none'>
				<LoginForm />
			</DialogContent>
		</Dialog>
	}
	return (
		<span
			onClick={onClick}
			className='cursor-pointer'>
			{children}
		</span>
	);
};
