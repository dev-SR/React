import { createContext, useContext, useState } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProtectedRoute from './pages/ProtectedRoute';
import SingleProduct from './pages/SingleProduct';

const SharedNavLayout = () => {
	const { Logout } = useAuth();

	return (
		<div className='h-screen w-full'>
			<nav className='h-12 w-full bg-indigo-500'>
				<ul className='flex space-x-4 h-full items-center pl-4 text-xl text-white'>
					<li>
						<NavLink to='/' className={({ isActive }) => (isActive ? 'font-bold' : '')} end>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/about'
							className={({ isActive }) => (isActive ? 'font-bold' : '')}
							end>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/products'
							className={({ isActive }) => (isActive ? 'font-bold' : '')}
							end>
							Products
						</NavLink>
					</li>
					<li>
						<button
							onClick={Logout}
							className='h-8 w-40 rounded-md border-2 border-indigo-200 pl-2'>
							Logout
						</button>
					</li>
				</ul>
			</nav>
			<Outlet />
			{/* Placeholder like the {children prop}. This is where the child routes will be rendered */}
		</div>
	);
};

const ProductSharedLayout = () => {
	return (
		<div className='h-screen w-full'>
			<nav className='h-12 w-full bg-indigo-500'>
				<input
					type='text'
					placeholder='Search'
					className='h-8 w-64 rounded-md border-2 border-gray-200 pl-2'
				/>
			</nav>
			<Outlet />
			{/* Placeholder like the {children prop}. This is where the child routes will be rendered */}
		</div>
	);
};
type ContextType = {
	isLogged: boolean;
	Logout: () => void;
	Login: () => void;
};

type FC = {
	children: React.ReactNode;
};

const AuthContext = createContext<ContextType>({} as ContextType);
const AuthProvider = ({ children }: FC) => {
	const [isLogged, setIsLogged] = useState(false);
	return (
		<AuthContext.Provider
			value={{
				isLogged: isLogged,
				Logout: () => setIsLogged(false),
				Login: () => setIsLogged(true)
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

const App = () => {
	return (
		<AuthProvider>
			<Routes>
				{/* Protected Route: Only logged in users can access this route*/}
				<Route path='/' element={<ProtectedRoute />}>
					<Route path='/' element={<SharedNavLayout />}>
						<Route index element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path='products' element={<ProductSharedLayout />}>
							<Route index element={<Products />} />
							<Route path=':productID' element={<SingleProduct />} />
							<Route path='new' element={<div>Create New</div>} />
						</Route>
					</Route>
				</Route>
				{/* Public Route */}
				<Route path='login' element={<Login />} />
				<Route path='*' element={<div>Not Found</div>} />
			</Routes>
		</AuthProvider>
	);
};
export default App;
