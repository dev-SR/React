import { Burger, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

export const TopBar = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
	const theme = useMantineTheme();
	return (
		<Header height={70} p='md'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
				{/* at sm */}
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={open}
						onClick={() => setOpen(!open)}
						size='md'
						color={theme.colors.gray[7]}
					/>
				</MediaQuery>
				<Text size='xl' weight={700}>
					Next.js + Mantine
				</Text>
			</div>
		</Header>
	);
};
