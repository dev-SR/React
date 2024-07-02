'use client';
import { motion } from 'framer-motion';
const KeyFrames = () => {
	const code = `<motion.div
    animate={{
        scale: [1, 1.4, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['0%', '0%', '50%', '50%', '0%']
    }}
    transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.1, 0.2, 0.7, 1] //start animate at the given times
    }}
/>`;
	return (
		<div>
			<motion.div
				className='w-12 h-12 bg-red-500'
				animate={{
					scale: [1, 1.4, 1],
					rotate: [0, 0, 180, 180, 0],
					borderRadius: ['0%', '0%', '50%', '50%', '0%']
				}}
				transition={{
					duration: 2,
					ease: 'easeInOut',
					repeat: Infinity,
					repeatDelay: 1,
					times: [0, 0.1, 0.2, 0.7, 1] //start animate at the given times
				}}
			/>
			<div>
				<pre>{code}</pre>
			</div>
		</div>
	);
};

export default KeyFrames;
