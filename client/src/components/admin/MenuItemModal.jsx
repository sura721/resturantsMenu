import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MenuItemForm from './MenuItemForm';
import axiosInstance from '../../api/axios';
import { FiX } from 'react-icons/fi';

function MenuItemModal({ isOpen, onClose, itemToEdit = null, onSaveSuccess }) {
    const [apiLoading, setApiLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    const handleFormSubmit = async (formData) => {
        setApiLoading(true);
        setApiError(null);
        try {
            let response;
            if (itemToEdit) {
                response = await axiosInstance.put(`/admin/menu/${itemToEdit._id}`, formData);
            } else {
                response = await axiosInstance.post('/admin/menu', formData);
            }

            if (response.data && response.data.success) {
                onSaveSuccess(); 
                closeModal();
            } else {
                 setApiError(response.data?.error || 'Failed to save item.');
            }
        } catch (err) {
            console.error("Error saving menu item:", err);
            const message = err.response?.data?.error || err.message || 'An error occurred while saving.';
            if (Array.isArray(message)) {
                 setApiError(message.join(', '));
            } else {
                 setApiError(message);
            }

        } finally {
            setApiLoading(false);
        }
    };

    const closeModal = () => {
         if (!apiLoading) {
             setApiError(null); 
             onClose();
         }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                                    {itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
                                     <button
                                        onClick={closeModal}
                                        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
                                        aria-label="Close modal"
                                        disabled={apiLoading}
                                     >
                                         <FiX size={18} />
                                     </button>
                                </Dialog.Title>
                                <div className="mt-4">
                                    <MenuItemForm
                                        onSubmit={handleFormSubmit}
                                        initialData={itemToEdit}
                                        isLoading={apiLoading}
                                        error={apiError}
                                    />
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default MenuItemModal;