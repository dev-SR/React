import React, { useState } from 'react';
import { useWindowScroll } from 'react-use';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { useDarkMode } from '../libs/useDarkMode';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PostListProps } from '../pages';
import Modal from './Modal';

export const transition = {
	type: 'spring',
	stiffness: 200,
	damping: 10
};
// https://medium.com/next-generation-web/create-a-dark-mode-toggle-micro-interaction-like-a-pro-279305e9c2
export const MoonIcon = ({ className }: { className: string }) => {
	const variants = {
		initial: { scale: 0.6, rotate: 90 },
		animate: { scale: 1, rotate: 0, transition },
		whileTap: { scale: 0.95, rotate: 15 }
	};

	return (
		<motion.svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='currentColor'
			className={className}>
			<motion.path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				// animation start state
				initial={{
					// opacity: 0,
					// animate path
					pathLength: 0
				}}
				// animation end state
				animate={{
					// opacity: 1,
					pathLength: 1
				}}
				transition={{
					duration: 0.7,
					ease: 'easeInOut'
				}}
				d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
			/>
		</motion.svg>
	);
};
// https://medium.com/next-generation-web/create-a-dark-mode-toggle-micro-interaction-like-a-pro-279305e9c2
// https://pavanjadhaw.me/blog/animate-svg-using-framer-motion

export const SunIcon = ({ className }: { className: string }) => {
	const whileTap = { scale: 0.95, rotate: 15 };

	const raysVariants = {
		initial: { rotate: 45 },
		animate: { rotate: 0, transition }
	};

	const coreVariants = {
		initial: { scale: 1.5 },
		animate: { scale: 1, transition }
	};
	return (
		<motion.svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			width='100'
			className={className}
			height='100'>
			<motion.path
				// animation start state
				initial={{
					opacity: 0,
					rotate: -45,
					// animate path
					pathLength: 0
				}}
				// animation end state
				animate={{
					opacity: 1,
					rotate: 0,
					pathLength: 1
				}}
				transition={{
					duration: 1,
					ease: 'easeInOut'
				}}
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
			/>
		</motion.svg>
	);
};

const CommandIcon = ({ className }: { className: string }) => {
	return (
		<svg className={className} viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				stroke='currentColor'
				d='M18.0713 3.22449C17.2756 3.22449 16.5126 3.54056 15.95 4.10317C15.3874 4.66578 15.0713 5.42884 15.0713 6.22449V18.2245C15.0713 19.0201 15.3874 19.7832 15.95 20.3458C16.5126 20.9084 17.2756 21.2245 18.0713 21.2245C18.8669 21.2245 19.63 20.9084 20.1926 20.3458C20.7552 19.7832 21.0713 19.0201 21.0713 18.2245C21.0713 17.4288 20.7552 16.6658 20.1926 16.1032C19.63 15.5406 18.8669 15.2245 18.0713 15.2245H6.07129C5.27564 15.2245 4.51258 15.5406 3.94997 16.1032C3.38736 16.6658 3.07129 17.4288 3.07129 18.2245C3.07129 19.0201 3.38736 19.7832 3.94997 20.3458C4.51258 20.9084 5.27564 21.2245 6.07129 21.2245C6.86694 21.2245 7.63 20.9084 8.19261 20.3458C8.75522 19.7832 9.07129 19.0201 9.07129 18.2245V6.22449C9.07129 5.42884 8.75522 4.66578 8.19261 4.10317C7.63 3.54056 6.86694 3.22449 6.07129 3.22449C5.27564 3.22449 4.51258 3.54056 3.94997 4.10317C3.38736 4.66578 3.07129 5.42884 3.07129 6.22449C3.07129 7.02014 3.38736 7.7832 3.94997 8.34581C4.51258 8.90842 5.27564 9.22449 6.07129 9.22449H18.0713C18.8669 9.22449 19.63 8.90842 20.1926 8.34581C20.7552 7.7832 21.0713 7.02014 21.0713 6.22449C21.0713 5.42884 20.7552 4.66578 20.1926 4.10317C19.63 3.54056 18.8669 3.22449 18.0713 3.22449Z'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-dashoffset='0px'
				stroke-dasharray='1px 1px'></path>
		</svg>
	);
};
const ModalContent = () => {
	return (
		<div className='bg-green-200 h-20'>
			<p>Modal Content</p>
		</div>
	);
};
const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');
const NavBar = ({ posts_metadata }: Partial<PostListProps>) => {
	const { x, y } = useWindowScroll();
	// const { theme, setTheme } = useTheme();
	const { theme, setTheme } = useDarkMode();
	const [show, setShow] = useState<boolean>(false);

	return (
		<>
			<motion.nav
				animate={{
					height: y > 100 ? 60 : 120
				}}
				className={classNames(
					'w-screen fixed top-0 z-50 backdrop-blur dark:bg-[#16181d]/5 transition-colors ease-in-out duration-300',
					y > 10 ? 'border-b border-black/10 dark:border-white/10 ' : 'border-b border-white/0'
				)}>
				<div className='max-w-sm md:max-w-4xl mx-auto flex items-center justify-between h-full py-2'>
					<div className='text-3xl font-bold dark:text-gray-200 cursor-pointer'>&#60;/&#62;</div>
					<div className='h-full flex items-center flex-shrink-0 justify-center space-x-4'>
						<div className='relative group'>
							{/* <div className='absolute inset-0 bg-indigo-600 blur opacity-0 group-hover:opacity-100 transition duration-300'></div> */}
							<button
								className='w-11 h-11 relative rounded-md p-2 flex justify-center items-center border  border-transparent hover:border-[2px] group-hover:border-[#5685f4] transition ease-in-out duration-300 group-hover:shadow-[0px_0px_30px_1px_rgb(86,133,244,.5)] bg-slate-600/10  dark:bg-slate-600/30'
								onClick={() => setShow(true)}>
								<CommandIcon className='w-8 h-8  dark:text-gray-200 text-gray-700 group-hover:text-[#5685f4]' />
							</button>
						</div>
						<div className='relative group'>
							{/* <div className='absolute inset-0 bg-indigo-600 blur opacity-0 group-hover:opacity-100 transition duration-300'></div> */}
							<button className='w-11 h-11 relative rounded-md p-2 flex justify-center items-center border  border-transparent hover:border-[2px] group-hover:border-[#5685f4] transition ease-in-out duration-300 group-hover:shadow-[0px_0px_30px_1px_rgb(86,133,244,.5)] bg-slate-600/10  dark:bg-slate-600/30 '>
								<a href='https://github.com/dev-SR' target='_blank' rel='noopener noreferrer'>
									<BsGithub
										className={classNames(
											'w-6 h-6  dark:text-gray-200 text-gray-700 group-hover:text-[#5685f4]'
										)}
									/>
								</a>
							</button>
						</div>

						<div className='relative group'>
							{/* <div className='absolute inset-0 bg-indigo-600 blur opacity-0 group-hover:opacity-100 transition duration-300'></div> */}
							<button
								className={classNames(
									' w-11 h-11 relative rounded-md p-1 flex justify-center items-center border border-transparent hover:border-[2px] group-hover:border-[#5685f4] transition ease-in-out duration-300 group-hover:shadow-[0px_2px_40px_-4px_rgb(86,133,244,.5)] bg-slate-600/10  dark:bg-slate-600/30 '
								)}
								// onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
								onClick={setTheme}>
								{theme == 'dark' ? (
									<SunIcon className='shrink-0 h-8 w-8 dark:text-gray-200 text-gray-700 group-hover:text-[#5685f4] ' />
								) : (
									<MoonIcon className='shrink-0 h-7 w-7 dark:text-gray-200 text-gray-700 group-hover:text-[#5685f4]' />
								)}
							</button>
						</div>
					</div>
				</div>
			</motion.nav>
			<Modal show={show} onClose={() => setShow(false)}>
				<ModalContent />
			</Modal>
		</>
	);
};

export default NavBar;
