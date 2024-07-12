'use client';
import { motion, Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const listVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

const itemVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200 } }
};

const StaggeringListInView = () => {
	return (
		<motion.ul
			layout
			className='grid gap-2 grid-cols-2'
			variants={listVariants}
			initial='hidden'
			// animate='visible'
			whileInView={'visible'}
			viewport={{
				once: true
			}}>
			{items.map((item, index) => (
				<motion.li key={index} variants={itemVariants}>
					<Badge className='text-nowrap'>{item}</Badge>
				</motion.li>
			))}
		</motion.ul>
	);
};

export default StaggeringListInView;
