import { useMantineTheme, AppShell } from '@mantine/core';
import React, { useState } from 'react';
import NavHeader from './NavHeader';
import SideNavBar from './SideNavBar';
type LayoutProps = {
	children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
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
			header={<NavHeader opened={opened} setOpened={setOpened} />}
			navbar={<SideNavBar opened={opened} />}>
			{children}
		</AppShell>
	);
};
export default Layout;
