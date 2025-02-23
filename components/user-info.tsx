import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ExtendedUser } from '@/auth';


interface UserInfoProps {
	label: string;
	user?: ExtendedUser
}

export const UserInfo: React.FC<UserInfoProps> = ({ label, user }) => {
	return (
		<Card className='w-[600px] shadow-sm'>
			<CardHeader className='text-2xl font-semibold text-center'>
				<p>{label}</p>
			</CardHeader>
            <CardContent className='space-y-4'>
            <div className='flex flex-row items-center justify-between p-4 border rounded-md shadow-sm'>
                    <p className='text-sm font-medium'>ID</p>
                    <p className='text-xs truncate max-w-[180px] font mono p-1 bg-slate-100 rounded-md'>{user?.id}</p>
                </div>
                <div className='flex flex-row items-center justify-between p-4 border rounded-md shadow-sm'>
                    <p className='text-sm font-medium'>Name</p>
                    <p className='text-xs truncate max-w-[180px] font mono p-1 bg-slate-100 rounded-md'>{user?.name}</p>
                </div>
                <div className='flex flex-row items-center justify-between p-4 border rounded-md shadow-sm'>
                    <p className='text-sm font-medium'>Email</p>
                    <p className='text-xs truncate max-w-[180px] font mono p-1 bg-slate-100 rounded-md'>{user?.email}</p>
                </div>
                <div className='flex flex-row items-center justify-between p-4 border rounded-md shadow-sm'>
                    <p className='text-sm font-medium'>Role</p>
                    <p className='text-xs truncate max-w-[180px] font mono p-1 bg-slate-100 rounded-md'>{user?.role}</p>
                </div>
                <div className='flex flex-row items-center justify-between p-4 border rounded-md shadow-sm'>
                    <p className='text-sm font-medium'>Two Factor Authentication</p>
                <Badge variant={user?.isTwoFactorEnabled ? "success" :"destructive"}>
                {user?.isTwoFactorEnabled ? "ON" :"OFF"}
                </Badge>
                </div>
            </CardContent>
		</Card>
	);
};
