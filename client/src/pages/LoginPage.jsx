 import React from 'react';
import LoginForm from '../components/LoginForm';  

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">  
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Admin Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;