'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { useAction } from 'next-safe-action/hooks';
import { verifyToken } from '@/actions/auth/verifyEmailToken';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const VerifyEmailToken = () => {
	const token = useSearchParams().get('token');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const { execute } = useAction(verifyToken, {
		onError: ({ error }) => {
			console.log(error);

			if (error.serverError) {
				setError(error.serverError);
			}
			if (error.validationErrors) {
				setError(String(error.validationErrors.token?._errors?.join(',')));
			}
		},
		onSuccess: (res) => {
			setSuccess(res.data?.message!);
		}
	});

	useEffect(() => {
		if (success || error) return;
		if (!token) {
			setError('Token not found');
			return;
		}
		execute({ token });
	}, []);

	return (
		<div className='container sm:w-1/3 mt-20'>
			<Card>
				<CardHeader>
					<CardTitle>Account Verification</CardTitle>
				</CardHeader>
				<CardContent>
					{!success && !error && (
						<Alert className='border-yellow-500 bg-yellow-500/10'>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' color='#d97706' />
							<AlertTitle className='text-yellow-600'>Verifying token</AlertTitle>
						</Alert>
					)}
					{success && (
						<div className='flex flex-col space-y-4 items-center'>
							<Alert className='border-green-500 bg-green-500/10'>
								<CheckCircle className='mr-2 h-4 w-4' color='#16a34a' />
								<AlertTitle className='text-green-600'>Verified</AlertTitle>
							</Alert>
							<Link href={'/auth/login'} className='text-primary'>
								Back to login
							</Link>
						</div>
					)}
					{error && (
						<Alert variant={'destructive'}>
							<AlertCircle className='mr-2 h-4 w-4' />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default VerifyEmailToken;
