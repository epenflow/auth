'use client';
import React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
} from '../ui/card';
import { cn } from '@/lib/utils';
import { Header } from './header';
import { When } from 'react-if';
import { Social } from './social';
import { BackButton } from './back-button';
interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}
export const CardWrapper: React.FC<CardWrapperProps> = ({
	backButtonHref,
	backButtonLabel,
	children,
	headerLabel,
	showSocial,
	className,
	style,
	...rest
}) => {
	return (
		<Card
			className={cn('w-[400px] shadow-sm', className)}
			style={{ ...style }}
			{...rest}>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			<When condition={showSocial}>
				<CardFooter>
					<Social />
				</CardFooter>
			</When>
			<CardFooter>
				<BackButton
					href={backButtonHref}
					label={backButtonLabel}
				/>
			</CardFooter>
		</Card>
	);
};
