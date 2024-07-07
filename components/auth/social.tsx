'use client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { IconBaseProps } from 'react-icons';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
interface SocialProps {}
export const Social: React.FC<SocialProps> = () => {
	const iconStyle: IconBaseProps = {
		width: '1.25rem',
		height: '1.25rem',
	};
	function onClick(provider: 'google' | 'github') {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	}
	return (
		<div className='flex items-center w-full gap-x-2'>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={() => onClick('google')}>
				<FcGoogle {...iconStyle} />
			</Button>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={() => onClick('github')}>
				<FaGithub {...iconStyle} />
			</Button>
		</div>
	);
};
