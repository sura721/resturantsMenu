import React from 'react';
import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function MenuItemCard({ item }) {
    let categoryColor = 'bg-gray-100/80 text-gray-800';
    if (item.category === 'ጾም') {
        categoryColor = 'bg-green-100/80 text-green-800';
    } else if (item.category === 'መጠጥ') {
        categoryColor = 'bg-blue-100/80 text-blue-800';
    } else if (item.category === 'ፍስክ') {
        categoryColor = 'bg-amber-200/70 text-amber-900';
    }

    return (
        <Link 
            to={`/menu/${item._id}`} 
            className="group border border-amber-200/50 rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm bg-white/80 hover:bg-amber-50/30 transition-all duration-200 flex flex-col h-full overflow-hidden"
        >
            <div className="relative overflow-hidden h-48">
                {item.imageUrl ? (
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                                e.target.nextElementSibling.style.display = 'flex';
                            }
                        }}
                    />
                ) : null}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-amber-100/40 to-amber-200/30 flex items-center justify-center text-amber-300/80 text-6xl ${item.imageUrl ? 'hidden' : 'flex'}`}>
                    <span>{item.category === 'መጠጥ' ? '🥤' : '🍔'}</span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">{item.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColor} backdrop-blur-sm flex-shrink-0 mt-1`}>
                        {item.category}
                    </span>
                </div>

                {item.description && (
                    <p className="text-sm text-gray-600/90 mb-3 flex-grow line-clamp-3">{item.description}</p>
                )}
                {!item.description && <div className="flex-grow min-h-[2rem]"></div>}

                {item.availabilityNote && (
                    <p className="text-xs text-amber-700/90 mt-1 mb-2 flex items-center">
                        <FiClock className="mr-1 flex-shrink-0" size="12"/>
                        <span className="break-words">{item.availabilityNote}</span>
                    </p>
                )}

                <p className="text-xl font-bold text-amber-700 mt-auto pt-2">
                    {item.price.toLocaleString()} Birr
                </p>
            </div>
        </Link>  
    );
}

export default MenuItemCard;