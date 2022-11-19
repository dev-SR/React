const Layout = ({ children }: any) => {
	return (
		<div className='flex flex-col items-start px-8 md:px-72 lg:px-96 pt-10 min-h-screen  space-y-4'>
			{children}
		</div>
	);
};

export default function Home() {
	return (
		<Layout>
			<h1>Welcome to Tailwind Config</h1>
			<button className=' focus:outline-none focus:ring-2 ring-offset-1'>Click Me</button>
			<button className='bg-secondary hover:bg-secondary-600 text-sm font-medium text-white focus:outline-none focus:ring-2 ring-offset-1 ring-secondary-300'>
				Click Me
			</button>
		</Layout>
	);
}
