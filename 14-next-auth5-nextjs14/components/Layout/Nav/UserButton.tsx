'use client';

import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const UserButton = ({ user }: Session) => {
	return (
		<div className=''>
			<p>{user?.email}</p>
			<Button variant={'outline'} onClick={() => signOut()}>
				Logout
			</Button>
		</div>
	);
};

export default UserButton;
