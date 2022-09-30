import { motion } from 'framer-motion';
import React from 'react';

const ContainerVariants = {
	initial: {},
	animate: {}
};

const H1Variants = {
	initial: { x: -1000 },
	animate: { x: 0 },
	transition: {
		type: 'tween',
		duration: 2,
		delay: 1
	}
};
const H2Variants = {
	initial: { y: -1000 },
	animate: { y: 0 },
	transition: {
		type: 'tween',
		duration: 1,
		delay: 0.4
	}
};

const Motion = () => {
	return (
		<motion.div variants={ContainerVariants} initial='initial' animate='animate'>
			<motion.h1 variants={H1Variants}>This is a motion h1</motion.h1>
			<motion.h2 variants={H2Variants}>This is a motion h2</motion.h2>
		</motion.div>
	);
};

export default Motion;
