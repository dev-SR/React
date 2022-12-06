import { Button, Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { classnames } from '../utils/classnames';
import { AppShell, Navbar, Header } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
	const { data, status } = useSession();

	return (
		<div>
			<main>
				{data?.user?.name || <Link href='/auth/signin'>Sign in</Link>}
				{status === 'loading' && <Text>Loading...</Text>}
				{status === 'authenticated' && <Button onClick={() => signOut()}>SIGN OUT</Button>}
			</main>
		</div>
	);
}
