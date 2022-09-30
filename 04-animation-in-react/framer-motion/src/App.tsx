import Motion from './component/Motion';
import TodoList from './component/TodoList';
import AnimatedRoutes from './pages/AnimatedRoutes';
import Navbar from './pages/Nav';

const App = () => {
	// return <TodoList />;
	// return <Motion />;
	return (
		<>
			<Navbar />
			<AnimatedRoutes />
		</>
	);
};

export default App;
