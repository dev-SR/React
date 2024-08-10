import AddPost from '@/components/AddPost';
import Posts from '@/components/Posts';

export default function Home() {
	return (
		<div className='flex flex-col space-y-2 m-auto sm:w-1/2 mt-10'>
			<AddPost />
			<h2>Posts....</h2>
			<Posts />
		</div>
	);
}
