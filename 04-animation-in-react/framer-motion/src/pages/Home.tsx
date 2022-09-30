import React from 'react';
import { motion } from 'framer-motion';

function Home() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className='text-center p-4'>
			<h1>Home page</h1>

			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, qui. Hic animi
				distinctio et maiores, ab nostrum at neque. Iusto minus perspiciatis vitae unde? In
				quibusdam nulla perspiciatis laboriosam ex.
			</p>
		</motion.div>
	);
}

export default Home;
