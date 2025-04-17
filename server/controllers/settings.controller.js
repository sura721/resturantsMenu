 import RestaurantSetting from '../models/RestaurantSetting.js';

export const getSettings = async (req, res, next) => {
    try {
        const settings = await RestaurantSetting.findOrCreate();
        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error fetching settings' });
    }
};

export const updateSettings = async (req, res, next) => {
    try {
        const { autoResetEnabled } = req.body;

        if (typeof autoResetEnabled !== 'boolean') {
             return res.status(400).json({ success: false, error: 'Invalid value for autoResetEnabled' });
        }

        const settings = await RestaurantSetting.findOneAndUpdate(
            { singleton: true },
            { $set: { autoResetEnabled: autoResetEnabled } },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: settings });
    } catch (err) {
         if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error updating settings' });
    }
};