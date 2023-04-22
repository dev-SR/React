'use client';

import React, { useState } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useTheme } from 'next-themes';

const NavBar = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div className='w-screen h-16'>
			<div className='flex items-center space-x-2'>
				<Switch
					id='airplane-mode'
					onCheckedChange={() => {
						setTheme(theme === 'dark' ? 'light' : 'dark');
					}}
				/>
				<Label htmlFor='airplane-mode' className=' text-black dark:text-white'>
					{theme === 'dark' ? 'Light' : 'Dark'}
				</Label>
			</div>
		</div>
	);
};

export default NavBar;
