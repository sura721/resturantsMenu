
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['ጾም', 'ፍስክ', 'መጠጥ'], trim: true },
    imageUrl: { type: String, required: false },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    availabilityNote: {
        type: String,
        required: false,
        trim: true
    },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);