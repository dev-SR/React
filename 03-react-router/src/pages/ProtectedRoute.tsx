import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../App';

const ProtectedRoute = () => {
	const { isLogged, Login } = useAuth();

	return isLogged ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
