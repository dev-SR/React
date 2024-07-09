'use client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ErrorAlert = ({ message = 'Something went wrong' }: { message: string }) => {
	return (
		<Alert variant='destructive'>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
};

export default ErrorAlert;
