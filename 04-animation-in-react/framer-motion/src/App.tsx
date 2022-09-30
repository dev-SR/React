import { motion } from 'framer-motion';

const App = () => {
	return (
		<div className='flex flex-col h-screen w-screen overflow-hidden'>
			<motion.div
				animate={{
					x: ['100px', '0px', '100px']
				}}>
				<div className=' w-52 h-20 bg-red-500'>Weeee I'm animated</div>
			</motion.div>
		</div>
	);
};
export default App;
