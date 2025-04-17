
import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../api/axios';
import MenuItemCardAdmin from './MenuItemCardAdmin';
import { FiSearch } from 'react-icons/fi';

function MenuItemListAdmin({ onEditItem }) {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [availabilityFilter, setAvailabilityFilter] = useState('available');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAdminItems();
    }, []);

    const fetchAdminItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/admin/menu');
            if (response.data && response.data.success) {
                setAllItems(response.data.data);
            } else {
                setError('Failed to fetch menu items.');
            }
        } catch (err) {
            console.error("Error fetching menu items for admin:", err);
            const message = err.response?.data?.error || err.message || 'Error fetching items.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAvailability = async (id) => {
        setUpdatingId(id);
        setError(null);
        try {
            const response = await axiosInstance.patch(`/admin/menu/${id}/toggle`);
            if (response.data && response.data.success) {
                setAllItems(prevItems =>
                    prevItems.map(item =>
                        item._id === id ? response.data.data : item
                    )
                );
            } else {
                setError('Failed to toggle availability.');
            }
        } catch (err) {
            console.error("Error toggling availability:", err);
            setError(err.response?.data?.error || 'Failed to toggle availability.');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('እርግጠኛ ነዎት ይህን የምግብ አይነት ማጥፋት ይፈልጋሉ?')) {
            return;
        }
        setUpdatingId(id);
        setError(null);
        try {
            await axiosInstance.delete(`/admin/menu/${id}`);
            setAllItems(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error("Error deleting item:", err);
            setError(err.response?.data?.error || 'Failed to delete item.');
        } finally {
            setUpdatingId(null);
        }
    };

    const displayedItems = useMemo(() => {
        let filtered = allItems;
        if (availabilityFilter === 'available') {
            filtered = filtered.filter(item => item.isAvailable);
        } else {
            filtered = filtered.filter(item => !item.isAvailable);
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        if (lowerCaseSearchTerm) {
             filtered = filtered.filter(item =>
                 item.name.toLowerCase().includes(lowerCaseSearchTerm)
             );
        }
        return filtered;
    }, [allItems, availabilityFilter, searchTerm]);

    if (loading && allItems.length === 0) return (
        <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-gray-600">ምግቦች እየመጡ ነው...</p>
        </div>
    );

    if (error) return <p className="text-red-500 text-center py-8 bg-red-50 px-4 rounded-lg">{error}</p>;

    const FilterTab = ({ filterValue, label }) => (
        <button
            onClick={() => setAvailabilityFilter(filterValue)}
            className={`px-4 py-2 text-sm font-bold rounded-lg focus:outline-none transition-colors duration-200 ${
                availabilityFilter === filterValue
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-amber-50'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex space-x-2">
                    <FilterTab filterValue="available" label="አለ" />
                    <FilterTab filterValue="unavailable" label="የለም" />
                </div>

                <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <FiSearch className="h-5 w-5" />
                    </span>
                    <input
                        type="text"
                        placeholder="በስም ፈልግ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border-2 border-amber-100 rounded-lg bg-white placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-medium"
                    />
                </div>
            </div>

            {displayedItems.length === 0 ? (
                <div className="text-center py-8 bg-amber-50 rounded-lg">
                    <p className="text-gray-600">
                        በ "{availabilityFilter === 'available' ? 'አለ' : 'የለም'}" ምድብ ውስጥ ምንም የምግብ አይነት አልተገኘም
                        {searchTerm && ` ለ "${searchTerm}"`}።
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {displayedItems.map((item) => (
                        <MenuItemCardAdmin
                            key={item._id}
                            item={item}
                            onEditItem={onEditItem}
                            onToggleAvailability={handleToggleAvailability}
                            onDeleteItem={handleDelete}
                            isUpdating={updatingId === item._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuItemListAdmin;