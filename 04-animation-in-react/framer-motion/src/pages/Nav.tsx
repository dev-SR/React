import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<nav className='h-12 bg-indigo-400 pl-4 text-white text-xl'>
				<ul className='flex space-x-4 items-center h-full'>
					<NavLink to='/' end className={({ isActive }) => (isActive ? 'font-bold' : '')}>
						Home
					</NavLink>
					<NavLink to='/about' className={({ isActive }) => (isActive ? 'font-bold' : '')}>
						About Us
					</NavLink>
					<NavLink to='/contact' className={({ isActive }) => (isActive ? 'font-bold' : '')}>
						Contact Us
					</NavLink>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
