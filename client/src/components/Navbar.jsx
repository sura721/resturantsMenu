import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FiLogOut, FiUser, FiGrid, FiHome, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';

function Navbar() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logoutAction = useAuthStore((state) => state.logoutAction);
    const actionLoading = useAuthStore((state) => state.actionLoading);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAdminPage = location.pathname.startsWith('/admin');

    const handleLogout = async () => {
        if (actionLoading) return;
        await logoutAction();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
         setIsMobileMenuOpen(false);
    }

    const linkBaseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";
    const mobileLinkBaseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150";
    const activeClassName = "bg-green-700 text-white";
    const inactiveClassName = "text-gray-300 hover:bg-green-600 hover:text-white";
    const backLinkClassName = "text-gray-300 hover:bg-green-700 hover:text-white";

    return (
        <nav className="bg-green-800 shadow-md sticky top-0 z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={closeMobileMenu} className="text-white text-xl font-bold">
                            Adama Digital Menu
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                         {isAuthenticated && isAdminPage ? (
                             <Link to="/" className={`${linkBaseClasses} ${backLinkClassName} flex items-center`}>
                                  <FiArrowLeft className="mr-1 h-4 w-4"/> Back to Menu
                             </Link>
                         ) : (
                             <NavLink to="/" end className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                  <span className="flex items-center"><FiHome className="mr-1 h-4 w-4"/> Menu</span>
                             </NavLink>
                         )}
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                    <span className="flex items-center"><FiGrid className="mr-1 h-4 w-4"/> Admin Panel</span>
                                </NavLink>
                                <button onClick={handleLogout} disabled={actionLoading} className={`${linkBaseClasses} ${inactiveClassName} flex items-center disabled:opacity-50`}>
                                    <FiLogOut className="mr-1 h-4 w-4"/> {actionLoading ? '...' : 'Logout'}
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login" className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                 <span className="flex items-center"><FiUser className="mr-1 h-4 w-4"/> Admin Login</span>
                            </NavLink>
                        )}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                         <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                         >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? ( <FiX className="block h-6 w-6" aria-hidden="true" /> ) : ( <FiMenu className="block h-6 w-6" aria-hidden="true" /> )}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden border-t border-green-700`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                     {isAuthenticated && isAdminPage ? (
                         <Link to="/" onClick={closeMobileMenu} className={`${mobileLinkBaseClasses} ${backLinkClassName} flex items-center`}>
                              <FiArrowLeft className="mr-2 h-5 w-5"/> Back to Menu
                         </Link>
                     ) : (
                         <NavLink to="/" end onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                             <span className="flex items-center"><FiHome className="mr-2 h-5 w-5"/> Menu</span>
                         </NavLink>
                     )}
                    {isAuthenticated ? (
                        <>
                             <NavLink to="/admin/dashboard" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                <span className="flex items-center"><FiGrid className="mr-2 h-5 w-5"/> Admin Panel</span>
                             </NavLink>
                            <button onClick={handleLogout} disabled={actionLoading} className={`${mobileLinkBaseClasses} w-full text-left ${inactiveClassName} flex items-center disabled:opacity-50`}>
                               <FiLogOut className="mr-2 h-5 w-5"/> {actionLoading ? 'Logging out...' : 'Logout'}
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBaseClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                             <span className="flex items-center"><FiUser className="mr-2 h-5 w-5"/> Admin Login</span>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;