'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const listVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3
		}
	}
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 }
};

const StaggeringList = () => {
	return (
		<motion.ul
			className='flex flex-col gap-4'
			variants={listVariants}
			initial='hidden'
			animate='visible'>
			{items.map((item, index) => (
				<motion.li key={index} variants={itemVariants}>
					<Badge className='text-nowrap'>{item}</Badge>
				</motion.li>
			))}
		</motion.ul>
	);
};

export default StaggeringList;
