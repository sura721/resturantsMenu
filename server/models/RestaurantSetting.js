import mongoose from 'mongoose';

const restaurantSettingSchema = new mongoose.Schema({
    singleton: {
        type: Boolean,
        default: true,
        unique: true, 
        required: true
    },
    autoResetEnabled: {
        type: Boolean,
        default: false,
        required: true
    },
}, { timestamps: true });


restaurantSettingSchema.statics.findOrCreate = async function() {
    let setting = await this.findOne({ singleton: true });
    if (!setting) {
    
        setting = await this.create({ singleton: true, autoResetEnabled: false });
    }
    return setting;
};

export default mongoose.model('RestaurantSetting', restaurantSettingSchema);