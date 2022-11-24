import { Navbar, Text, useMantineColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import { classnames } from '../utils/classnames';

const navdata = [
	{
		title: 'Categories',
		url: 'category'
	},
	{
		title: 'Add Category',
		url: 'addcategory'
	},
	{
		title: 'Products',
		url: 'products'
	},
	{
		title: 'Add Product',
		url: 'addproduct'
	},

	{
		title: 'Filters',
		url: 'filters'
	},
	{
		title: 'Filter Options',
		url: 'filteroptions'
	}
];

const SideNavBar = ({ opened }: { opened: boolean }) => {
	const { colorScheme } = useMantineColorScheme();

	const dark = colorScheme === 'dark';

	return (
		<Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200, lg: 300 }}>
			<div className='flex flex-col h-full w-full'>
				{navdata.map((item, index) => (
					<Link href={`/admin/${item.url}`} className='no-underline' key={index}>
						<Text
							className={classnames(
								'cursor-pointer p-4 rounded-lg',
								dark && 'text-gray-400 hover:bg-gray-500/30',
								!dark && 'text-black'
							)}>
							{item.title}
						</Text>
					</Link>
				))}
			</div>
		</Navbar>
	);
};

export default SideNavBar;
