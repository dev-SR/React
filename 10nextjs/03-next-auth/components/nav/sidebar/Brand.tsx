import {
	ActionIcon,
	Box,
	Group,
	Navbar,
	ThemeIcon,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
	Text,
	Title
} from '@mantine/core';
import React from 'react';
import { GoArchive } from 'react-icons/go';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';

export const Brand = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<Box
			sx={(theme) => ({
				paddingLeft: theme.spacing.xs,
				paddingRight: theme.spacing.xs,
				paddingBottom: theme.spacing.lg,
				borderBottom: `1px solid ${
					colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
				}`
			})}>
			<Group position='apart' align='center'>
				{/* LOGO */}
				<Group>
					<ThemeIcon variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }} size='lg'>
						<GoArchive size={18} />
					</ThemeIcon>
				</Group>
				<Title
					size={'1.2rem'}
					weight={700}
					sx={{
						fontFamily: 'Inter, sans-serif'
					}}>
					Inventory
				</Title>
				<ActionIcon
					onClick={() => toggleColorScheme()}
					variant='filled'
					size='lg'
					sx={{
						backgroundColor: colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]
					}}>
					{colorScheme === 'dark' ? <BsSun size={18} /> : <BsMoon size={18} />}
				</ActionIcon>
			</Group>
		</Box>
	);
};
