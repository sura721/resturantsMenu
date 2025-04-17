 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const loginAction = useAuthStore((state) => state.loginAction);
  const authError = useAuthStore((state) => state.authError);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const actionLoading = useAuthStore((state) => state.actionLoading);  

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated || actionLoading) return; 
    await loginAction({ username, password });
   };

   if (isAuthenticated) {
     return null;
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {authError && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md" role="alert">
          {authError}
        </div>
      )}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          disabled={actionLoading} 
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          disabled={actionLoading}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={actionLoading} 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {actionLoading ? 'Logging in...' : 'Log In'} 
        </button>
      </div>
    </form>
  );
}

export default LoginForm;