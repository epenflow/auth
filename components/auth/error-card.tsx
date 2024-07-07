import React from 'react';

import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
interface ErrorCardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ErrorCard: React.FC<ErrorCardProps> = ({ className, ...rest }) => {
	return (
		<CardWrapper
			headerLabel='Oops! Something went wrong!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'>
			<div className='flex items-center justify-center w-full'>
				<ExclamationTriangleIcon className='w-20 h-20 text-destructive' />
			</div>
		</CardWrapper>
	);
};
