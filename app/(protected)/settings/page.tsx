'use client';
import { logout } from '@/actions/logout';
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentUser } from '@/hook/use-current-user';
import { useSession } from 'next-auth/react';
import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsSchema } from '@/schemas';
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSuccess } from '@/components/form-succes';
import { FormError } from '@/components/form-error';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Role } from '@prisma/client';
import { Switch } from '@/components/ui/switch';
import { When } from 'react-if';
export default function SettingsPage() {
	const { update } = useSession();
	const session = useCurrentUser();
	const [isPending, startTransition] = React.useTransition();
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: session?.name || undefined,
			email: session?.email || undefined,
			password: undefined,
			newPassword: undefined,
			role: session?.role || undefined,
			isTwoFactorEnabled: session?.isTwoFactorEnabled || undefined,
		},
	});
	function onSubmit(values: z.infer<typeof SettingsSchema>) {
		startTransition(() => {
			settings(values)
				.then((data) => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError('Something went wrong!');
				});
		});
	}
	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>Settings</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='space-y-6'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='John Doe'
												disabled={isPending}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<When condition={session?.isOAuth === false}>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='johndoe@example.com'
													disabled={isPending}
													type='email'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='******'
													disabled={isPending}
													type='password'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='newPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='******'
													disabled={isPending}
													type='password'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</When>
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a role' />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												<SelectItem value={Role.admin}>
													Admin
												</SelectItem>
												<SelectItem value={Role.user}>
													User
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<When condition={session?.isOAuth === false}>
								<FormField
									control={form.control}
									name='isTwoFactorEnabled'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-l border p-3 shadow-sm'>
											<div className='-space-y-0.5'>
												<FormLabel>
													Two Factor Authentication
												</FormLabel>
												<FormDescription>
													Enable two factor
													authentication for your
													account
												</FormDescription>
											</div>
											<Switch
												disabled={isPending}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormItem>
									)}
								/>
							</When>
							<FormSuccess message={success} />
							<FormError message={error} />
						</div>
						<Button
							type='submit'
							disabled={isPending}>
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
