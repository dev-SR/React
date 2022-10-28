import React from 'react';
import { useWindowScroll } from 'react-use';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { useDarkMode } from '../libs/useDarkMode';
import { useTheme } from 'next-themes';

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
			viewBox='0 0 50 50'
			className={className}
			key='moon'>
			<motion.path
				d='M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z'
				fill='currentColor'
				initial='initial'
				animate='animate'
				whileTap='whileTap'
				variants={variants}
			/>
		</motion.svg>
	);
};

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
			key='sun'
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			whileTap={whileTap}
			// Centers the rotation anchor point vertically & horizontally
			style={{ originX: '50%', originY: '50%' }}>
			<motion.circle
				cx='11.9998'
				cy='11.9998'
				r='5.75375'
				fill='currentColor'
				initial='initial'
				animate='animate'
				variants={coreVariants}
			/>
			<motion.g initial='initial' animate='animate' variants={raysVariants}>
				<circle
					cx='3.08982'
					cy='6.85502'
					r='1.71143'
					transform='rotate(-60 3.08982 6.85502)'
					fill='currentColor'
				/>
				<circle
					cx='3.0903'
					cy='17.1436'
					r='1.71143'
					transform='rotate(-120 3.0903 17.1436)'
					fill='currentColor'
				/>
				<circle cx='12' cy='22.2881' r='1.71143' fill='currentColor' />
				<circle
					cx='20.9101'
					cy='17.1436'
					r='1.71143'
					transform='rotate(-60 20.9101 17.1436)'
					fill='currentColor'
				/>
				<circle
					cx='20.9101'
					cy='6.8555'
					r='1.71143'
					transform='rotate(-120 20.9101 6.8555)'
					fill='currentColor'
				/>
				<circle cx='12' cy='1.71143' r='1.71143' fill='currentColor' />
			</motion.g>
		</motion.svg>
	);
};

const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');
const NavBar = () => {
	const { x, y } = useWindowScroll();
	const { theme, setTheme } = useTheme();

	return (
		<motion.nav
			animate={{
				height: y > 100 ? 60 : 120
			}}
			className={classNames(
				'w-screen fixed top-0 z-50 backdrop-blur bg-[#16181d]/5 transition-colors ease-in-out duration-300',
				y > 10 ? 'border-b border-white/10 ' : 'border-b border-white/0'
			)}>
			<div className='max-w-sm md:max-w-4xl mx-auto flex items-center justify-between h-full py-2'>
				<div className='text-3xl font-bold dark:text-gray-200 cursor-pointer'>&#60;/&#62;</div>
				<div className='h-full flex items-center flex-shrink-0 justify-center space-x-4'>
					<div className='relative group'>
						<div className='absolute inset-0 bg-indigo-600 blur opacity-0 group-hover:opacity-100 transition duration-300'></div>
						<button className='relative rounded-md p-2 bg-gray-700/30 flex justify-center items-center border border-transparent hover:border-2	group-hover:border-indigo-600 group-hover:bg-[#16181d]/80 transition-colors ease-in-out duration-300'>
							<BsGithub className='text-2xl text-white/50 cursor-pointer' />
						</button>
					</div>

					<div className='relative group'>
						<div className='absolute inset-0 bg-indigo-600 blur opacity-0 group-hover:opacity-100 transition duration-300'></div>
						<button
							className='relative rounded-md p-2 bg-gray-700/30 flex justify-center items-center border border-transparent hover:border-2	group-hover:border-indigo-600 group-hover:bg-[#16181d]/80 transition-colors ease-in-out duration-300'
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
							{theme == 'dark' ? (
								<SunIcon className='w-6 h-6 text-yellow-100 ' />
							) : (
								<MoonIcon className='w-6 h-6 text-gray-300 ' />
							)}
						</button>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;
