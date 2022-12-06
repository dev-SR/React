import { Avatar, Box, Group, UnstyledButton, Text, useMantineTheme } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const getWordInitials = (word: string): string => {
	// const initials = word.match(/\b\w/g) || [];
	// return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	const chars = word.trim().split(' ');
	return chars
		.map((c) => c[0])
		.join('')
		.toUpperCase();
};

const BottomAvater = () => {
	const theme = useMantineTheme();
	const { data: session } = useSession();
	const { pathname } = useRouter();

	return (
		<Link href={pathname === '/settings' ? '/' : '/settings'} style={{ textDecoration: 'none' }}>
			<Box
				sx={{
					paddingTop: theme.spacing.sm,
					borderTop: `1px solid ${
						theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
					}`
				}}>
				<UnstyledButton
					sx={(theme) => ({
						display: 'block',
						width: '100%',
						padding: theme.spacing.xs,
						borderRadius: theme.radius.sm,
						color: theme.colorScheme == 'dark' ? theme.colors.dark[0] : theme.colors.black,
						'&:hover': {
							backgroundColor:
								theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
						}
					})}>
					<Group>
						<Avatar src={session?.user?.image} radius='xl' color='blue' variant='light' />
						<Box sx={{ flex: 1 }}>
							<Text size='sm' weight={500}>
								{session?.user?.name || session?.user?.email || 'User'}
							</Text>
							<Text color={'dimmed'} size='xs'>
								{session?.user?.email}
							</Text>
						</Box>
						{
							pathname === '/settings' ? (
								<MdKeyboardArrowLeft size={18} />
							) : (
								<MdKeyboardArrowRight size={18} />
							)
						}


					</Group>
				</UnstyledButton>
			</Box>
		</Link>
	);
};

export default BottomAvater;
