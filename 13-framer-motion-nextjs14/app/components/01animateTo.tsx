'use client';
import { motion } from 'framer-motion';
const AnimateTo = () => {
	const code = `<motion.div
	animate={{
		rotate: 180,
		backgroundColor: 'green'
	}}
	transition={{
		type: 'spring',
		stiffness: 100,
		delay: 1,
		backgroundColor: { delay: 0.5, ease: 'easeOut' }
	}}
/>`;
	return (
		<div>
			<motion.div
				className='w-20 h-20 bg-red-500'
				animate={{
					rotate: 180,
					backgroundColor: 'green'
				}}
				transition={{
					type: 'spring',
					stiffness: 100,
					delay: 1,
					backgroundColor: { delay: 0.5, ease: 'easeOut' }
				}}
			/>
			<div>
				<pre>{code}</pre>
			</div>
		</div>
	);
};

export default AnimateTo;
