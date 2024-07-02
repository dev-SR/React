'use client';
import { motion } from 'framer-motion';
const HoverTapFocus = () => {
	const code = `<motion.button
	className='bg-blue-500 p-4 rounded-full'
	whileHover={{ scale: 1.1 }}
	whileFocus={{ scale: 1.2 }}
	whileTap={{ scale: 0.9 }}>
	Hover me!
</motion.button>`;
	return (
		<div>
			<motion.button
				className='bg-blue-500 p-4 rounded-full'
				whileHover={{ scale: 1.1 }}
				whileFocus={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}>
				Hover me!
			</motion.button>
			<div>
				<pre>{code}</pre>
			</div>
		</div>
	);
};

export default HoverTapFocus;
