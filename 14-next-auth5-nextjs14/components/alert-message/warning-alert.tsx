'use client';
import { MailWarning } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const WarningAlert = ({ message = 'Something went wrong' }: { message: string }) => {
	return (
		<Alert className='border-yellow-500 bg-yellow-500/10'>
			<MailWarning className='h-4 w-4' color='#d97706' />
			<AlertTitle className='text-yellow-600'>Attention!</AlertTitle>
			<AlertDescription className='text-yellow-600'>{message}</AlertDescription>
		</Alert>
	);
};

export default WarningAlert;
