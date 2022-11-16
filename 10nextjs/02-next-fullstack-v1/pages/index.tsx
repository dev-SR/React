import { Users } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../prisma';
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const users: Users[] = await prisma.users.findMany();
	return {
		props: {
			users: JSON.parse(JSON.stringify(users))
		}
	};
}
export default function Home({ users }: { users: Users[] }) {
	return (
		<>
			<div className='flex flex-col h-screen justify-center items-center'>
				{users.map((user) => {
					return (
						<div key={user.id}>
							<h1>{user.name}</h1>
							<p>{user.email}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
