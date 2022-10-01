import Modal from './component/Modal';
import Motion from './component/Motion';
import TodoList from './component/TodoList';
import AnimatedRoutes from './pages/AnimatedRoutes';
import NiceMenu from './pages/Menu';
import NiceMenu2 from './pages/Menu2';
import Navbar from './pages/Nav';

const App = () => {
	// return <TodoList />;
	// return <Motion />;
	return (
		<div className='bg-black'>
			{/* <Navbar /> */}
			{/* <AnimatedRoutes /> */}
			{/* <NiceMenu /> */}
			{/* <NiceMenu2 /> */}
			<Modal />

			{[...Array(100)].map((_, i) => (
				<div key={i} className='pl-20 h-20 text-white'>
					{i}
				</div>
			))}
		</div>
	);
};

export default App;
