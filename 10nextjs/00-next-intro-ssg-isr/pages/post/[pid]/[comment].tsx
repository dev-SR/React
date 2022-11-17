import { useRouter } from 'next/router';

export default function Comment() {
	const router = useRouter();

	return (
		<>
			<p>Comment Details: {JSON.stringify(router.query, null, 4)}</p>
		</>
	);
}
