import { Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Home() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	console.log('dark', dark);

	return (
		<div className='flex flex-col h-screen justify-center items-center'>
			<ActionIcon
				color={dark ? 'yellow' : 'blue'}
				onClick={() => toggleColorScheme()}
				className='h-10 w-10'
				title='Toggle color scheme'>
				{dark ? <FaSun className='h-8 w-8' /> : <FaMoon className='h-8 w-8' />}
			</ActionIcon>
			<Text size='xl'>Extra large text</Text>
		</div>
	);
}
