import { Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { TbClipboardList } from 'react-icons/tb';

interface MantineLinkProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	color: string;
	setOpen: (open: boolean) => void;
}

const MantineLink = ({ href, icon, label, color, setOpen }: MantineLinkProps) => {
	const { pathname } = useRouter();
	return (
		<Link href={href} passHref style={{ textDecoration: 'none' }}>
			<UnstyledButton
				onClick={() => setOpen(false)}
				sx={(theme) => ({
					display: 'block',
					width: '100%',
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color: theme.colorScheme == 'dark' ? theme.colors.dark[0] : theme.colors.black,
					backgroundCoIor:
						pathname === href
							? theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[0]
							: 'transparent',
					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
					}
				})}>
				<Group>
					<ThemeIcon color={color} variant='light'>
						{icon}
					</ThemeIcon>
					<Text size='sm'>{label}</Text>
				</Group>
			</UnstyledButton>
		</Link>
	);
};

const data: MantineLinkProps[] = [
	{
		href: '/',
		icon: <AiOutlineHome size={18} />,
		label: 'Home',
		color: 'indigo',
		setOpen: () => {}
	},
	{
		href: '/categories',
		icon: <BiCategory size={18} />,
		label: 'Categories',
		color: 'cyan',
		setOpen: () => {}
	},
	{
		href: '/products',
		icon: <TbClipboardList size={18} />,
		label: 'Products',
		color: 'grape',
		setOpen: () => {}
	},
	{
		href: '/settings',
		icon: <FiSettings size={18} />,
		label: 'Settings',
		color: 'orange',
		setOpen: () => {}
	}
];
const MenuItem = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
	return (
		<>
			{data.map((item, index) => (
				<MantineLink key={index} {...item} setOpen={setOpen} />
			))}
		</>
	);
};

export default MenuItem;
