import AnimateTo from './components/01animateTo';
import AnimateFromTo from './components/02animateFromTo';
import KeyFrames from './components/03KeyFrame';
import HoverTapFocus from './components/04HoverTapFocus';
import AnimatePresenceExit1 from './components/05AnimatePresenceExit1';
import AnimatePresenceExit2 from './components/06AnimatePresenceExit2';
import Container from './components/Container';

export default function Home() {
	return (
		<div className='flex flex-col gap-2 items-center py-10'>
			<h1 className='font-bold text-lg'>1. AnimateTo with transition</h1>
			<div>
				<Container>
					<AnimateTo />
				</Container>
			</div>
			<h1 className='font-bold text-lg'>2. AnimateFromTo with transition</h1>
			<div>
				<Container>
					<AnimateFromTo />
				</Container>
			</div>
			<h1 className='font-bold text-lg'>3. Animation loop with keyframes</h1>
			<div>
				<Container>
					<KeyFrames />
				</Container>
			</div>
			<h1 className='font-bold text-lg'>4. Hover, focus, tap interactivity</h1>
			<div>
				<Container>
					<HoverTapFocus />
				</Container>
			</div>
			<h1 className='font-bold text-lg'>
				5. Exit animation with <code>AnimatePresence</code>
			</h1>
			<div>
				<Container>
					<AnimatePresenceExit1 />
				</Container>
			</div>
			<h1 className='font-bold text-lg'>
				6. Exit animation with <code>AnimatePresence</code> - ex2
			</h1>
			<div>
				<AnimatePresenceExit2 />
			</div>
		</div>
	);
}
