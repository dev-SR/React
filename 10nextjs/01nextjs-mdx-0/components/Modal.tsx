// https://kimia-ui.vercel.app/components/modal

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
/*  @reach/portal simplify creating portal*/
import { Portal } from '@reach/portal';
import { useClickAway } from 'react-use';

const CloseIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='red'
		className='w-7 h-7'>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
);

type ModalProps = {
	isOpen: boolean;
	children: React.ReactNode;

	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const className = {
	placeholder: `fixed inset-0  w-screen h-screen m-0 shadow rounded overflow-y-auto flex justify-center items-center  z-50`,
	overlay: `fixed inset-0 w-screen h-screen bg-black/50 z-40`,
	modal: `max-h-min max-w-xl bg-white shadow rounded sm:h-1/2 sm:w-1/2`
};

const modalVariant = {
	initial: { opacity: 0, y: 60, scale: 0.3 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			duration: 0.2,
			when: 'beforeChildren'
		}
	},
	exit: { opacity: 0, scale: 0.5, transition: { duration: 0.25 } }
};

const modalContentVariant = {
	initial: { x: -30, opacity: 0 },
	animate: { x: 0, opacity: 1, transition: { duration: 0.2 } }
};

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	// close modal on click outside
	const handleOutsideClick = () => {
		if (!isOpen) return;
		setIsOpen(false);
	};
	useClickAway(ref, handleOutsideClick);

	// hide scrollbar and prevent body from moving when modal is open
	//put focus on modal dialogue
	// React.useEffect(() => {
	// 	if (!isOpen) return;

	// 	ref.current?.focus();

	// 	const html = document.documentElement;
	// 	const scrollbarWidth = window.innerWidth - html.clientWidth;

	// 	html.style.overflow = 'hidden';
	// 	html.style.paddingRight = `${scrollbarWidth}px`;

	// 	return () => {
	// 		html.style.overflow = '';
	// 		html.style.paddingRight = '';
	// 	};
	// }, [isOpen]);

	React.useEffect(() => {
		const body = document.querySelector('body');
		if (body) {
			if (isOpen) {
				body.style.overflow = 'hidden';
			} else {
				body.style.overflow = 'auto';
			}
		}
	}, [isOpen]);

	return (
		<Portal>
			<AnimatePresence>
				{isOpen && (
					<>
						<div className={className.overlay} />
						<motion.div className={className.placeholder}>
							<motion.div
								className={className.modal}
								ref={ref}
								variants={modalVariant}
								initial='initial'
								animate='animate'
								exit='exit'>
								<motion.div
									variants={modalContentVariant}
									className='flex flex-col space-y-4 h-full p-4'>
									{children}
								</motion.div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default Modal;
