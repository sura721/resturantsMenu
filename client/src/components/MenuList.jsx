 import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../api/axios';
import MenuItemCard from './MenuItemCard';

function MenuList() {
  const [allItems, setAllItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/menu');
        if (response.data && response.data.success) {
          setAllItems(response.data.data);
        } else {
          setError('Failed to fetch menu items.');
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        const message = err.response?.data?.error || err.message || 'An error occurred.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'All') {
      return allItems;
    } else {
      return allItems.filter(item => item.category === filter);
    }
  }, [allItems, filter]);

  const FilterButton = ({ category }) => (
    <button
      onClick={() => setFilter(category)}
      className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ease-in-out border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500 flex-shrink-0 ${
        filter === category
          ? 'bg-amber-600 text-white border-amber-600 transform scale-105 shadow-lg'
          : 'bg-white text-gray-800 border-amber-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800'
      }`}
    >
      {category === 'ጾም' ? 'Tsom(ጾም)' : category === 'ፍስክ' ? 'Fisk(ፍስክ)' : category === 'መጠጥ' ? 'Drinks(መጠጥ)' : 'All Items'}
    </button>
  );

  if (loading) {
    return (
      <div className="text-center py-32">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
        <p className="text-lg font-medium text-amber-800">Loading delicious menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <p className="text-lg font-medium text-red-600 bg-red-50 inline-block px-6 py-3 rounded-lg">Error loading menu: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <FilterButton category="All" />
        <FilterButton category="ጾም" />
        <FilterButton category="ፍስክ" />
        <FilterButton category="መጠጥ" />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-lg font-medium text-gray-500 bg-gray-50 inline-block px-6 py-3 rounded-lg">No items available in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuList;