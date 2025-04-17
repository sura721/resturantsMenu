import React from 'react';
import { FiCheckCircle, FiXCircle, FiEdit, FiTrash2, FiClock } from 'react-icons/fi';

function MenuItemCardAdmin({ item, onEditItem, onToggleAvailability, onDeleteItem, isUpdating }) {
    let categoryColor = 'bg-gray-100 text-gray-800';
    if (item.category === 'ጾም') {
        categoryColor = 'bg-green-100 text-green-800';
    } else if (item.category === 'መጠጥ') {
        categoryColor = 'bg-blue-100 text-blue-800';
    } else if (item.category === 'ፍስክ') {
        categoryColor = 'bg-orange-100 text-orange-800';
    }

    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden border-2 border-amber-100 transition-all duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100 hover:shadow-lg'}`}>
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-40 sm:h-48 object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}

            <div className="p-4 space-y-3">
                <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-gray-900 break-words">{item.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColor}`}>
                        {item.category}
                    </span>
                </div>

                {item.description && (
                    <p className="text-sm text-gray-700">{item.description}</p>
                )}

                <p className="text-md font-extrabold text-amber-600">{item.price?.toLocaleString()} ብር</p>

                {item.availabilityNote && (
                    <p className="text-xs text-amber-700 flex items-center bg-amber-50 px-2 py-1 rounded">
                        <FiClock className="mr-1 flex-shrink-0" size="12"/>
                        <span className="break-words">{item.availabilityNote}</span>
                    </p>
                )}

                <div className="pt-2">
                    <button
                        onClick={() => onToggleAvailability(item._id)}
                        disabled={isUpdating}
                        className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors duration-200 ${
                            item.isAvailable
                                ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
                                : 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
                            }`}
                    >
                        {item.isAvailable ?
                            <><FiCheckCircle className="mr-1.5"/> አለ</> :
                            <><FiXCircle className="mr-1.5"/> የለም</>
                        }
                    </button>
                </div>
            </div>

            <div className="bg-amber-50 px-4 py-3 flex justify-end space-x-4">
                <button
                    onClick={() => onEditItem(item)}
                    disabled={isUpdating}
                    className="p-2 text-amber-600 hover:text-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="አርም"
                >
                    <FiEdit size={18}/>
                </button>
                <button
                    onClick={() => onDeleteItem(item._id)}
                    disabled={isUpdating}
                    className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="ሰርዝ"
                >
                    <FiTrash2 size={18}/>
                </button>
            </div>
        </div>
    );
}

export default MenuItemCardAdmin;