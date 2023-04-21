import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
	return (
		<main className='p-12'>
			<h1 className='text-4xl font-bold'>Dashboard</h1>
			<Link href={'/'} className='text-blue-700'>
				Go back to Home 🎯
			</Link>
		</main>
	);
};

export default Dashboard;
