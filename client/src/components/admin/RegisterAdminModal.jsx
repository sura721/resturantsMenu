import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import RegisterAdminForm from './RegisterAdminForm';
import axiosInstance from '../../api/axios';
import { FiX, FiUserPlus } from 'react-icons/fi';

function RegisterAdminModal({ isOpen, onClose }) {
    const [apiLoading, setApiLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async (formData) => {
        setApiLoading(true);
        setApiError(null);
        setSuccessMessage('');
        try {
            const response = await axiosInstance.post('/auth/register', formData);

            if (response.data && response.data.success) {
                 setSuccessMessage(response.data.message || 'Admin registered successfully!');
           
            } else {
                 setApiError(response.data?.error || 'Failed to register admin.');
            }
        } catch (err) {
            console.error("Error registering admin:", err);
            const message = err.response?.data?.error || err.message || 'An error occurred.';
             setApiError(message);
        } finally {
            setApiLoading(false);
        }
    };

    const closeModal = () => {
         if (!apiLoading) {
             setApiError(null);
             setSuccessMessage(''); 
             onClose();
         }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                                     <span className="flex items-center"><FiUserPlus className="mr-2"/> Register New Admin</span>
                                     <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400" aria-label="Close modal" disabled={apiLoading}> <FiX size={18} /> </button>
                                </Dialog.Title>
                                <div className="mt-4">
                                     {successMessage && (
                                         <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md" role="alert">
                                            {successMessage}
                                         </div>
                                     )}
                                     {!successMessage && (
                                        <RegisterAdminForm
                                            onSubmit={handleFormSubmit}
                                            isLoading={apiLoading}
                                            error={apiError}
                                        />
                                     )}
                                </div>
                                 {successMessage && (
                                     <div className="mt-4 text-right">
                                         <button
                                             type="button"
                                             onClick={closeModal}
                                             className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                         >
                                             Close
                                         </button>
                                     </div>
                                )}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default RegisterAdminModal;