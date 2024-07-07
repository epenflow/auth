'use client';
import React from 'react';
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
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';
export const ResetForm =()=>{
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSucces] = React.useState<string | undefined>('');
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	});
	function handleSubmit(values: z.infer<typeof ResetSchema>) {
		setError('');
		setSucces('');
		startTransition(() => {
            reset(values).then((data)=>{
                setError(data?.error)
                setSucces(data?.success)
            })
		});
	}
	return <CardWrapper 
    headerLabel="Forgot your password" 
    backButtonHref="/auth/login" 
    backButtonLabel="Back to login">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='jondoe@example.com'
											type='email'
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
						Send reset email
					</Button>
				</form>
			</Form>
		</CardWrapper>
}