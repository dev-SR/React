import { Button, Text } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';
import { CustomNextPage } from 'types/CustomNextType';
const Home: CustomNextPage = () => {
	const { data, status } = useSession();
	return (
		<PageLayout>
			<div>
				{data?.user?.name || <Link href='/auth/signin'>Sign in</Link>}
				{status === 'loading' && <Text>Loading...</Text>}
				{status === 'authenticated' && <Button onClick={() => signOut()}>SIGN OUT</Button>}
			</div>
		</PageLayout>
	);
};
Home.auth = true;
export default Home;
