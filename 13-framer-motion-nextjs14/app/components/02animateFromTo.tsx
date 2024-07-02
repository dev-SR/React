'use client';
import { motion } from 'framer-motion';
const AnimateFromTo = () => {
	const code = `<motion.div
	initial={{
		opacity: 0
	}}
	animate={{
		opacity: 1
	}}
	transition={{
		duration: 2,
		ease: 'easeInOut'
	}}
/>`;
	return (
		<div>
			<motion.div
				className='w-20 h-20 bg-red-500'
				initial={{
					opacity: 0
				}}
				animate={{
					opacity: 1
				}}
				transition={{
					duration: 2,
					ease: 'easeInOut'
				}}
			/>
			<div>
				<pre>{code}</pre>
			</div>
		</div>
	);
};

export default AnimateFromTo;
