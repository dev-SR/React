import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import UserInfo from './pages/UserInfo';

function App() {
	return (
		<div className='App'>
			<Toaster />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/add' element={<AddEditUser />} />
				<Route path='/update/:id' element={<AddEditUser />} />
				<Route path='/view/:id' element={<UserInfo />} />
			</Routes>
		</div>
	);
}

export default App;
