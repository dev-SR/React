import { Navbar } from '@mantine/core';
import React from 'react';
import BottomAvater from './BottomAvater';
import { Brand } from './Brand';
import MenuItem from './MenuItem';

export const SideBar = ({
	open,
	setOpen
}: {
	open: boolean;
	setOpen: (value: boolean) => void;
}) => {
	return (
		<Navbar hidden={!open} p='xs' hiddenBreakpoint={open ? 'xs' : 'sm'} width={{ sm: 300 }}>
			<Navbar.Section mt={'xs'}>
				<Brand />
			</Navbar.Section>
			<Navbar.Section grow mt={'md'}>
				<MenuItem setOpen={setOpen} />
			</Navbar.Section>
			<Navbar.Section>
				<BottomAvater />
			</Navbar.Section>
		</Navbar>
	);
};
