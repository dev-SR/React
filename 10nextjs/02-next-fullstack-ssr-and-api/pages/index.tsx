import { Users } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../prisma';

import DashboardContent from '../components/DashboardContent';
import Layout from '../components/Layout';

export default function AppShellDemo() {
	return (
		<Layout>
			<DashboardContent />
		</Layout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const users: Users[] = await prisma.users.findMany();
	return {
		props: {
			users: JSON.parse(JSON.stringify(users))
		}
	};
}
