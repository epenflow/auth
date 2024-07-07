'use client';
import React from 'react';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../form-succes';
import { FormError } from '../form-error';
import { When } from 'react-if';
export const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');
	const onSubmit = React.useCallback(() => {
		if (success || error) return;
		if (!token) {
			setError('Missing token!');
			return;
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError('Something went wrong!');
			});
	}, [token, success, error]);
	React.useEffect(() => {
		onSubmit();
	}, [onSubmit]);
	return (
		<CardWrapper
			headerLabel='Confirming your verification'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'>
			<div className='flex items-center justify-center w-full'>
				<When condition={!success && !error}>
					<BeatLoader />
				</When>
				<FormSuccess message={success} />
				<When condition={!success}>
					<FormError message={error} />
				</When>
			</div>
		</CardWrapper>
	);
};
