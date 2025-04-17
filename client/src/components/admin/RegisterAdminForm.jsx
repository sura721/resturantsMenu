import React, { useState } from 'react';

function RegisterAdminForm({ onSubmit, isLoading, error }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError('');

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
             setValidationError("Password must be at least 6 characters long.");
             return;
        }
        if (isLoading) return;

        onSubmit({ username, password });
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-4">
            {(error || validationError) && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md" role="alert">
                    {error || validationError}
                </div>
            )}
            <div>
                <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700">New Admin Username</label>
                <input
                    type="text" id="reg-username" value={username} required
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    disabled={isLoading}
                />
            </div>
             <div>
                <label htmlFor="reg-password"className="block text-sm font-medium text-gray-700">Password (min 6 chars)</label>
                <input
                    type="password" id="reg-password" value={password} required minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    disabled={isLoading}
                />
            </div>
              <div>
                <label htmlFor="reg-confirm-password"className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password" id="reg-confirm-password" value={confirmPassword} required minLength={6}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                         password && confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                />
                 {password && confirmPassword && password !== confirmPassword && (
                     <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                 )}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading || (password !== confirmPassword) || password.length < 6}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isLoading ? 'Registering...' : 'Register New Admin'}
                </button>
            </div>
        </form>
    );
}

export default RegisterAdminForm;