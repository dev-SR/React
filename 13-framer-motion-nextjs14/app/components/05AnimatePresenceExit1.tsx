'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatePresenceExit1 = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleHideMessage = () => {
		setIsVisible(false);
	};

	return (
		<div className='flex flex-col gap-2'>
			<button onClick={handleHideMessage} className='text-nowrap px-4 py-2 rounded-md bg-blue-500'>
				{isVisible ? 'Clear Success Message' : 'Cleared!'}
			</button>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						key='successMessage'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }} // this won't trigger without
						transition={{ duration: 0.5 }}
						className='text-nowrap p-4 rounded-md ring-1 ring-green-500 bg-green-500/40'>
						Success! Your action was completed.
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AnimatePresenceExit1;
