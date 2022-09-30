import React from 'react';
import { motion } from 'framer-motion';

function About() {
	return (
		<motion.div
			className='text-center p-4'
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}>
			<h1>About Page</h1>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi debitis fuga
				deserunt, placeat qui optio totam perspiciatis error. Repudiandae, enim veniam. Dolorum
				officiis recusandae consequuntur veritatis magni aliquam itaque.
			</p>
		</motion.div>
	);
}

export default About;
