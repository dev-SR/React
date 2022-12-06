import { AppShell, useMantineTheme } from '@mantine/core';
import React from 'react';
import { SideBar } from '@ui/nav/sidebar';
import { TopBar } from '@ui/nav/topbar';

type PageLayoutProps = {
	children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
	const theme = useMantineTheme();
	const [open, setOpen] = React.useState(false);

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
				}
			}}
			navbarOffsetBreakpoint='sm'
			header={<TopBar open={open} setOpen={setOpen} />}
			navbar={<SideBar open={open} setOpen={setOpen} />}>
			{children}
		</AppShell>
	);
};
export default PageLayout;
