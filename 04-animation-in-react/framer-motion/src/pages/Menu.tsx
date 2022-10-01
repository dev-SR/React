import React, { useState } from 'react';

type OtherProps = {
	[key: string]: any;
};

import { motion } from 'framer-motion';
type MenuItemProps = {
	text: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
};
const Underline = () => (
	<motion.div
		className='absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-pink-500 to-red-500'
		layout
		layoutId='underline'
	/>
);

const MenuItem = ({ text }: MenuItemProps) => {
	const [isBeingHovered, setIsBeingHovered] = useState(false);

	return (
		<motion.div
			className='px-10 relative cursor-pointer'
			onHoverStart={() => setIsBeingHovered(true)}
			onHoverEnd={() => setIsBeingHovered(false)}>
			<span className='relative'>
				{text}
				{isBeingHovered && <Underline />}
			</span>
		</motion.div>
	);
};
const NiceMenu = () => {
	return (
		<div className='w-screen p-20 '>
			<div className='border p-10 flex justify-center'>
				<MenuItem text={'Home'}></MenuItem>
				<MenuItem text={'About us'}></MenuItem>
				<MenuItem text={'Products'}></MenuItem>
			</div>
		</div>
	);
};
export default NiceMenu;
