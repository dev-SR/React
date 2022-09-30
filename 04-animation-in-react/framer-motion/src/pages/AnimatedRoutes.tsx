import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
	return (
		<AnimatePresence>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
