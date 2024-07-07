'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

const UserButton = ({ session }: { session: Session }) => {
	const [loading, setLoading] = useState(false);

	return (
		<div className='flex gap-2 items-center'>
			<p>{session.user?.email}</p>

			<Button
				type='submit'
				disabled={loading}
				onClick={async () => {
					setLoading(true);
					await signOut({ redirect: true, callbackUrl: '/auth/login' });
					setLoading(false);
					// const promise = signOut({ redirect: true, callbackUrl: '/auth/login' });
					// toast.promise(promise, {
					// 	loading: 'Logging you out...',
					// 	success: () => {
					// 		return 'Logged out!';
					// 	},
					// 	error: 'Error'
					// });
				}}>
				Logout
			</Button>
		</div>
	);
};

export default UserButton;
