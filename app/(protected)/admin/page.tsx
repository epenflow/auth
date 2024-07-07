'use client';

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-succes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hook/use-current-role';
import { toast } from 'sonner';

export default function AdminPage() {
	const role = useCurrentRole();
	function onApiRouterClick() {
		fetch('/api/admin').then((response) => {
			if (response.ok) {
				toast.success('Allowed API Route!');
			} else {
				toast.error('Forbbiden API Route');
			}
		});
	}
	function onServerActionClick() {
		admin().then((data) => {
			if (data.error) {
				toast.error(data.error);
			}
			if (data.success) {
				toast.success(data.success);
			}
		});
	}
	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>{role}</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<RoleGate allowedRole='admin'>
					<FormSuccess message='You are allowed to see this content' />
				</RoleGate>
				<div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
					<p className='text-sm font-medium'>Admin-only API Route</p>
					<Button onClick={onApiRouterClick}>Click to test</Button>
				</div>
				<div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
					<p className='text-sm font-medium'>
						Admin-only Server Action
					</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
}
