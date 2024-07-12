import AnimateTo from './components/01animateTo';
import AnimateFromTo from './components/02animateFromTo';
import KeyFrames from './components/03KeyFrame';
import HoverTapFocus from './components/04HoverTapFocus';
import AnimatePresenceExit1 from './components/05AnimatePresenceExit1';
import AnimatePresenceExit2 from './components/06AnimatePresenceExit2';
import Container from './components/Container';
import Orchestration from './components/08Orchestration';
import Variants from './components/07Variants';
import AnimatePresenceExit1Layout from './components/05AnimatePresenceExit1Layout';

export default function Home() {
	return (
		<div className='flex flex-col gap-2 items-center py-10 w-full'>
			<h2 className='font-bold text-lg'>1. AnimateTo with transition</h2>
			<div>
				<Container>
					<AnimateTo />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>2. AnimateFromTo with transition</h2>
			<div>
				<Container>
					<AnimateFromTo />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>3. Animation loop with keyframes</h2>
			<div>
				<Container>
					<KeyFrames />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>4. Hover, focus, tap interactivity</h2>
			<Container>
				<HoverTapFocus />
			</Container>
			<h2 className='font-bold text-lg'>
				5. Exit animation with <code>AnimatePresence</code>
			</h2>
			<div>
				<Container width={500} height={200}>
					<AnimatePresenceExit1 />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>
				5.1. <code>AnimatePresence</code> with <code>layout</code> for smooth layout changes
			</h2>
			<div>
				<Container width={500} height={200}>
					<AnimatePresenceExit1Layout />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>
				6. Exit animation with <code>AnimatePresence</code> - ex2
			</h2>
			<div>
				<AnimatePresenceExit2 />
			</div>
			<h2 className='font-bold text-lg'>7. variants</h2>
			<div>
				<Container>
					<Variants />
				</Container>
			</div>
			<h2 className='font-bold text-lg'>8. Orchestrating with staggering animation</h2>
			<div>
				<Orchestration />
			</div>
		</div>
	);
}
