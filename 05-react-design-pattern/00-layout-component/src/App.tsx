import { useState } from 'react';
import Modal from './Modal';
import { SplitScreen, LeftHandComponent, RightHandComponent } from './SplitScreen';

const ModalContent = () => {
	return (
		<div className='bg-green-200 h-20'>
			<p>Modal Content</p>
		</div>
	);
};
const App = () => {
	const [show, setShow] = useState<boolean>(false);
	return (
		<>
			<button
				onClick={() => setShow(true)}
				className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded'>
				Show Modal
			</button>
			<Modal show={show} onClose={() => setShow(false)}>
				<ModalContent />
			</Modal>
		</>
	);
};
export default App;
