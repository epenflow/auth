'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-succes';
import { reset } from '@/actions/reset';
import { NewPasswordSchema } from '@/schemas';
import { newPassword } from '@/actions/new-password';
export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSucces] = React.useState<string | undefined>('');
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	});
	function handleSubmit(values: z.infer<typeof NewPasswordSchema>) {
		setError('');
		setSucces('');
		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSucces(data?.success);
			});
		});
	}
	return (
		<CardWrapper
			headerLabel='Enter a new password'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className='w-full'>
						Reset password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
