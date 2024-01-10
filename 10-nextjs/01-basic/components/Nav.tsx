import Link from 'next/link';
import React from 'react';

const Nav = () => {
	return (
		<div className='flex h-16 bg-gray-700 items-center justify-center w-full'>
			<Link href={'/'} className='text-white underline cursor-pointer'>
				Home
			</Link>
		</div>
	);
};

export default Nav;
