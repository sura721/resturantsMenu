 import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
     const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const initialCheckLoading = useAuthStore((state) => state.initialCheckLoading);

    const location = useLocation();

    if (initialCheckLoading) {
        return (
             <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-medium text-gray-600">Checking authentication...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;