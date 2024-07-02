'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3 }}
						className='bg-white p-8 rounded-lg shadow-lg'
						onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
					>
						<h2 className='text-xl font-bold mb-4'>Modal Title</h2>
						<p className='mb-4 text-gray-500'>This is a modal message.</p>
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

const AnimatePresenceExit2 = () => {
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

export default AnimatePresenceExit2;
