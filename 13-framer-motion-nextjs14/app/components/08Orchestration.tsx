'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, Variant } from 'framer-motion';
const container = {
	hidden: { opacity: 0, y: 50 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.1
		}
	}
};

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 }
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key='modalBackdrop'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center'
					onClick={onClose}>
					<motion.div
						key='modalContent'
						exit={{ opacity: 0, y: 50 }}
						variants={container}
						initial='hidden'
						animate='show'
						className='bg-white p-8 rounded-lg shadow-lg overflow-hidden'
						onClick={(e) => e.stopPropagation()}>
						<motion.h2 variants={item} className='text-xl font-bold mb-4 text-gray-500'>
							Modal Title
						</motion.h2>
						<motion.p variants={item} className='mb-4 text-gray-500'>
							This is a modal message.
						</motion.p>

						<button
							onClick={onClose}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
							Close
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Orchestration = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div>
			<button
				onClick={openModal}
				className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 text-nowrap'>
				Open Modal
			</button>
			<Modal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default Orchestration;
