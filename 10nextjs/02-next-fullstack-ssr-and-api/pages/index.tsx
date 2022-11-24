import { Users } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../prisma';
import { useState } from 'react';
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme
} from '@mantine/core';

export default function AppShellDemo() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
				}
			}}
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			header={
				<Header height={{ base: 50, md: 70 }} p='md'>
					<div className='flex items-center h-full'>
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

						<Text>Application header</Text>
					</div>
				</Header>
			}
			navbar={
				<Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200, lg: 300 }}>
					<Navbar.Section>First section</Navbar.Section>
					{/* Grow section will take all available space that is not taken by first and last sections */}
					<Navbar.Section grow>Grow section</Navbar.Section>
					{/* Last section with normal height (depends on section content) */}
					<Navbar.Section>2022</Navbar.Section>
				</Navbar>
			}>
			<div className=''>
				<Text>Resize app to see responsive navbar in action</Text>
			</div>
		</AppShell>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const users: Users[] = await prisma.users.findMany();
	return {
		props: {
			users: JSON.parse(JSON.stringify(users))
		}
	};
}
