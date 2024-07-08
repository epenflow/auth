'use client';
import React from 'react';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-succes';
import { login } from '@/actions/login';
import Link from 'next/link';
import { Else, If, Then, When } from 'react-if';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '../ui/input-otp';
interface LoginFormProps {}
export const LoginForm: React.FC<LoginFormProps> = ({}) => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: '';
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSucces] = React.useState<string | undefined>('');
	const [showTwoFactor, setShowTwoFactor] = React.useState<boolean>(false);
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	function handleSubmit(values: z.infer<typeof LoginSchema>) {
		setError('');
		setSucces('');
		startTransition(() => {
			login(values, callbackUrl as string)
				.then((data) => {
					if (data?.error) {
						setError(data.error);
					}
					if (data?.success) {
						setSucces(data.success);
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError('Something went wrong!'));
		});
	}
	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<If condition={showTwoFactor}>
							<Then>
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>
												Two Factor Code
											</FormLabel>
											<FormControl>
												{/* <Input
													{...field}
													disabled={isPending}
													placeholder='123456'
												/> */}
												<InputOTP
													maxLength={6}
													{...field}
												>
													<InputOTPGroup>
														<InputOTPSlot
															index={0}
														/>
														<InputOTPSlot
															index={1}
														/>
														<InputOTPSlot
															index={2}
														/>
														<InputOTPSeparator />
														<InputOTPSlot
															index={3}
														/>
														<InputOTPSlot
															index={4}
														/>
														<InputOTPSlot
															index={5}
														/>
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href={'/auth/reset'}>
													Forgot password?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</Then>
							<Else>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="jondoe@example.com"
													type="email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="******"
													type="password"
												/>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href={'/auth/reset'}>
													Forgot password?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</Else>
						</If>
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type="submit"
						className="w-full"
					>
						{showTwoFactor ? 'Confirm' : 'Login'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
