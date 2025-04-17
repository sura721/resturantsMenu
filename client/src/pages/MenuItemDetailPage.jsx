import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { FiClock, FiArrowLeft } from 'react-icons/fi';

function MenuItemDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            setError(null);
            setItem(null);
            try {
                const response = await axiosInstance.get(`/menu/${id}`);
                if (response.data && response.data.success) {
                    setItem(response.data.data);
                } else {
                    setError('Failed to fetch menu item details.');
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                     setError("Menu item not found or is currently unavailable.");
                } else {
                    setError(err.response?.data?.error || err.message || 'An error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <div className="text-center text-gray-500 py-20">Loading item details...</div>;
    }

    if (error) {
         return (
             <div className="text-center text-red-500 py-20 px-4">
                 <p className="mb-4">Error: {error}</p>
                 <button
                    onClick={handleGoBack}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                    <FiArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </button>
             </div>
         );
    }

    if (!item) {
         return <div className="text-center text-gray-500 py-20">Item details could not be loaded.</div>;
    }

    let categoryColor = 'bg-gray-100 text-gray-800';
    if (item.category === 'ጾም') {
        categoryColor = 'bg-green-100 text-green-800';
    } else if (item.category === 'መጠጥ') {
        categoryColor = 'bg-blue-100 text-blue-800';
    } else if (item.category === 'ፍስክ') {
        categoryColor = 'bg-orange-100 text-orange-800';
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <button
                onClick={handleGoBack}
                className="inline-flex items-center mb-4 text-sm text-gray-600 hover:text-gray-900 group"
            >
                <FiArrowLeft className="mr-1 h-4 w-4 transition-transform duration-150 group-hover:-translate-x-1" />
                Back to Menu
            </button>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                 {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-64 md:h-80 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'flex';
                          }
                      }}
                     />
                 ) : (
                      <div className={`w-full h-64 md:h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-6xl`}>
                          <span>{item.category === 'መጠጥ' ? '🥤' : '🍲'}</span>
                      </div>
                 )}

                <div className="p-6 md:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {item.name}
                         </h1>
                         <span className={`mt-1 sm:mt-0 text-sm font-medium px-3 py-1 rounded-full ${categoryColor} flex-shrink-0`}>
                            {item.category}
                        </span>
                    </div>

                     <p className="text-2xl font-bold text-green-700">
                        {item.price.toLocaleString()} Birr
                     </p>

                     {item.availabilityNote && (
                         <p className="text-sm text-blue-700 flex items-center bg-blue-50 p-2 rounded-md border border-blue-200">
                            <FiClock className="mr-2 flex-shrink-0 h-4 w-4"/>
                            <span className="break-words">{item.availabilityNote}</span>
                         </p>
                    )}

                     {item.description && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Details</h2>
                            <p className="text-gray-600 whitespace-pre-wrap">
                                {item.description}
                            </p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuItemDetailPage;