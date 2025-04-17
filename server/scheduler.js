 import cron from 'node-cron';
import MenuItem from './models/MenuItem.js';
import RestaurantSetting from './models/RestaurantSetting.js';

const autoResetTask = cron.schedule('0 0 * * *', async () => {
    try {
        const settings = await RestaurantSetting.findOrCreate();
        if (settings && settings.autoResetEnabled) {
            await MenuItem.updateMany(
                { isAvailable: false },
                { $set: { isAvailable: true } }
            );
        }
    } catch (error) {
        
    }
}, {
    scheduled: true,
    timezone: "Africa/Addis_Ababa"
});

export default autoResetTask;