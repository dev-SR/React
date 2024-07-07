import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();
	return (
		<main>
			<pre>{JSON.stringify(session, null, 4)}</pre>
		</main>
	);
}
