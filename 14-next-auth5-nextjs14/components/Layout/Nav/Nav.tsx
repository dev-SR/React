import { auth } from '@/auth';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import UserButton from './UserButton';

const NavBar = async () => {
	const session = await auth();
	return (
		<header className='h-16 bg-secondary'>
			<nav className='flex justify-between h-full items-center px-10'>
				<Link href={'/'}>Logo</Link>
				{!session ? (
					<Button asChild size={'sm'}>
						<Link className='flex gap-2' href={'/auth/login'}>
							<LogIn size={16} />
							<span>Login</span>
						</Link>
					</Button>
				) : (
					<UserButton session={session} />
				)}
			</nav>
		</header>
	);
};

export default NavBar;
