import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1 className=' text-4xl'>About</h1>
			<Link href='/'>
				<span className='text-blue-500 underline cursor-pointer'>Home</span>
			</Link>
		</div>
	);
};

export default About;

