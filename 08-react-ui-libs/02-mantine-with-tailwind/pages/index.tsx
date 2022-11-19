import { Button, Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { classnames } from '../utils/classnames';

export default function Home() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<div className='flex flex-col h-screen justify-center items-center'>
			<ActionIcon
				color={dark ? 'yellow' : 'blue'}
				onClick={() => toggleColorScheme()}
				className='h-10 w-10'
				title='Toggle color scheme'>
				{dark ? <FaSun className='h-8 w-8' /> : <FaMoon className='h-8 w-8' />}
			</ActionIcon>
			<Text
				className={classnames('font-normal text-4xl ', dark ? 'text-blue-200' : 'text-blue-800')}>
				Extra large text
			</Text>
			<Button>Click Me</Button>
			<Button variant='outline'>Click Me</Button>
			<Text size='xl'>Extra large text</Text>
		</div>
	);
}
