import Dummy from './components/Dummy';
import printProps from './components/PrintProps';

const HOCDummy = printProps(Dummy);

const App = () => {
	return <HOCDummy username='John' userId={1} />;
};
export default App;
