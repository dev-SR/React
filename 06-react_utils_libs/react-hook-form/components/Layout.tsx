import Link from 'next/link';
import React from 'react';
type LayoutProps = {
	children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='flex flex-col min-h-screen '>
			<div className='h-10 bg-blue-500 w-full'>
				<div className='max-w-lg mx-auto flex space-x-4 items-center h-full'>
					<Link
						href='/'
						className='flex items-center justify-center h-full text-white text-xl no-underline
						active:text-gray-200 hover:text-gray-200'>
						Home
					</Link>
					<Link
						href='/dynamic1'
						className='flex items-center justify-center h-full text-white text-xl no-underline'>
						useFieldArray
					</Link>
				</div>
			</div>
			<div className='flex-1 flex flex-col justify-center'>{children}</div>
		</div>
	);
};
export default Layout;
