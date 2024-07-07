'use client';
import { logout } from '@/actions/logout';
import React from 'react';
interface LogoutButtonProps {
	children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
	function onClick() {
		logout();
	}
	return <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
};
