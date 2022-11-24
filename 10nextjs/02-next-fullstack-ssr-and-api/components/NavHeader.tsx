import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
	AppShell,
	Navbar,
	Header,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	ActionIcon,
	useMantineColorScheme
} from '@mantine/core';
import Link from 'next/link';
const NavHeader = ({
	opened,
	setOpened
}: {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const theme = useMantineTheme();

	return (
		<Header height={{ base: 50, md: 70 }} p='md'>
			<div className='flex items-center h-full justify-between'>
				<div className='sm:hidden'>
					{/*
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
					*/}
					<Burger
						opened={opened}
						onClick={() => setOpened((o) => !o)}
						size='sm'
						color={theme.colors.gray[6]}
						mr='xl'
					/>
				</div>
				<Link href='/' className='no-underline'>
					<Text>Header</Text>
				</Link>

				<ActionIcon
					color={dark ? 'yellow' : 'blue'}
					onClick={() => toggleColorScheme()}
					className='h-10 w-10'
					title='Toggle color scheme'>
					{dark ? <FaSun className='h-6 w-6' /> : <FaMoon className='h-6 w-6' />}
				</ActionIcon>
			</div>
		</Header>
	);
};

export default NavHeader;
