import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MenuListPage from './pages/MenuListPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MenuItemDetailPage from './pages/MenuItemDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';
import Navbar from './components/Navbar';

function App() {
  const initialCheckLoading = useAuthStore((state) => state.initialCheckLoading);
  const checkUserStatus = useAuthStore((state) => state.checkUserStatus);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  if (initialCheckLoading) {
     return (
        <div className="flex items-center justify-center min-h-screen">
           <div className="text-xl font-medium text-gray-600">Loading Application...</div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50">
         <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <main>
                 <Routes>
                    <Route path="/" element={<MenuListPage />} />
                    <Route path="/menu/:id" element={<MenuItemDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                 </Routes>
            </main>
        </div>
    </div>
  );
}

export default App;