 import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import MenuItemListAdmin from '../components/admin/MenuItemListAdmin';
import MenuItemModal from '../components/admin/MenuItemModal';
import AdminSettings from '../components/admin/AdminSettings';
import RegisterAdminModal from '../components/admin/RegisterAdminModal';  
import { FiUserPlus } from 'react-icons/fi';  

function AdminDashboardPage() {
    const user = useAuthStore((state) => state.user);
    const logoutAction = useAuthStore((state) => state.logoutAction);
    const actionLoading = useAuthStore((state) => state.actionLoading);
    const navigate = useNavigate();

    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [currentItemToEdit, setCurrentItemToEdit] = useState(null);
    const [listVersion, setListVersion] = useState(0);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLogout = async () => { if (!actionLoading) await logoutAction(); };
    const openAddMenuModal = () => { setCurrentItemToEdit(null); setIsMenuModalOpen(true); };
    const openEditMenuModal = (item) => { setCurrentItemToEdit(item); setIsMenuModalOpen(true); };
    const closeMenuModal = () => { setIsMenuModalOpen(false); setCurrentItemToEdit(null); };
    const handleMenuSaveSuccess = () => { setListVersion(prev => prev + 1); closeMenuModal(); };
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white rounded-lg shadow">
                 <h1 className="text-xl font-bold">Admin Dashboard</h1>
                 {user && ( <span className="text-sm text-gray-600">Welcome, {user.username}!</span> )}
                 <div className="flex items-center gap-2">
                      <button
                        onClick={openRegisterModal}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                        title="Register New Admin"
                      >
                         <FiUserPlus className="mr-1 -ml-0.5 h-4 w-4"/> Register Admin
                      </button>
                     <button onClick={handleLogout} disabled={actionLoading} className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50">
                        {actionLoading ? '...' : 'Logout'}
                    </button>
                 </div>
            </div>

             <div className="p-6 bg-white rounded-lg shadow-md"> <AdminSettings /> </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                    <h2 className="text-lg font-semibold">Manage Menu Items</h2>
                    <button onClick={openAddMenuModal} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"> Add New Item </button>
                </div>
                <MenuItemListAdmin key={listVersion} onEditItem={openEditMenuModal} />
            </div>

             <MenuItemModal isOpen={isMenuModalOpen} onClose={closeMenuModal} itemToEdit={currentItemToEdit} onSaveSuccess={handleMenuSaveSuccess} />
             {/* Render the Register Modal */}
             <RegisterAdminModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
        </div>
    );
}

export default AdminDashboardPage;