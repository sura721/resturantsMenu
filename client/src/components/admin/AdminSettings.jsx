import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { Switch } from '@headlessui/react';

function AdminSettings() {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/admin/settings');
            if (response.data && response.data.success) {
                setSettings(response.data.data);
            } else {
                setError("Failed to load settings.");
            }
        } catch (err) {
            console.error("Error fetching settings:", err);
            setError(err.response?.data?.error || "Could not load settings.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleAutoReset = async (enabled) => {
        if (!settings || isSaving) return;

        setIsSaving(true);
        setError(null);
        try {
            const response = await axiosInstance.put('/admin/settings', {
                autoResetEnabled: enabled
            });
            if (response.data && response.data.success) {
                setSettings(response.data.data);
            } else {
                setError("Failed to update setting.");
            }
        } catch (err) {
            console.error("Error updating setting:", err);
            setError(err.response?.data?.error || "Could not update setting.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600"></div>
        </div>
    );

    if (error && !settings) return <p className="text-red-500 text-center py-4">{error}</p>;
    if (!settings) return <p className="text-gray-500 text-center py-4">Settings not available.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-amber-800">Restaurant Settings</h2>
            {error && !isSaving && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <Switch.Group as="div" className="flex items-center justify-between py-3 border-b border-t border-amber-100">
                <span className="flex-grow flex flex-col mr-4">
                    <Switch.Label as="span" className="text-sm font-medium text-gray-900">
                        በየእኩለ ሌሊቱ ሁሉንም 'active' ይደረጉ
                    </Switch.Label>
                </span>
                <Switch
                    checked={settings.autoResetEnabled}
                    onChange={handleToggleAutoReset}
                    disabled={isSaving}
                    className={`${
                        settings.autoResetEnabled ? 'bg-amber-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50`}
                >
                    <span className="sr-only">Enable auto-reset</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            settings.autoResetEnabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </Switch.Group>
        </div>
    );
}

export default AdminSettings;