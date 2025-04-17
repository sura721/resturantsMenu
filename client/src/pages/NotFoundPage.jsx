 import React from 'react';
import { Link } from 'react-router-dom';  
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)] px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
            Sorry, the page you are looking for does not exist or may have been moved.
        </p>
        <Link
            to="/"  
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
        >
            Go to Homepage
        </Link>
    </div>
  );
}

export default NotFoundPage;