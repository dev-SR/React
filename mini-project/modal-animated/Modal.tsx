// https://kimia-ui.vercel.app/components/modal

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
/*  @reach/portal simplify creating portal*/
import Portal from '@reach/portal';
import { useOnClickOutside } from 'usehooks-ts';

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

type ModelProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const className = {
	placeholder: `fixed top-0 left-0 z-40 w-screen h-screen m-0 shadow rounded overflow-y-auto flex justify-center items-center `,
	overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
	modal: `h-1/3 w-1/3 bg-white shadow rounded sm:h-1/2 sm:w-1/2`
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

const Model = ({ isOpen, setIsOpen }: ModelProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	// close modal on click outside
	const handleOutsideClick = () => {
		if (!isOpen) return;
		setIsOpen(false);
	};
	useOnClickOutside(ref, handleOutsideClick);

	// hide scrollbar and prevent body from moving when modal is open
	//put focus on modal dialogue
	React.useEffect(() => {
		if (!isOpen) return;

		ref.current?.focus();

		const html = document.documentElement;
		const scrollbarWidth = window.innerWidth - html.clientWidth;

		html.style.overflow = 'hidden';
		html.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			html.style.overflow = '';
			html.style.paddingRight = '';
		};
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
									<div className='flex justify-between'>
										<h1 className='text-2xl font-bold'>Modal Title</h1>
										<button onClick={() => setIsOpen(false)}>
											<CloseIcon />
										</button>
									</div>

									<div>Modal Content Lorem ipsum dolor...</div>
								</motion.div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};

const App = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-blue-600'>
				Open Modal
			</button>
			<Model isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

export default App;
