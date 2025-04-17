 import MenuItem from '../models/MenuItem.js';
import cloudinary from '../config/cloudinary.js';
import { formatBufferToDataURI } from '../utils/dataUri.js';

export const getAllMenuItemsAdmin = async (req, res, next) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error fetching all menu items' });
  }
};

export const toggleAvailability = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Menu item not found' });
        }
        item.isAvailable = !item.isAvailable;
        await item.save();
        res.status(200).json({ success: true, data: item });
    } catch (err) {
        if (err.name === 'CastError') {
           return res.status(404).json({ success: false, error: 'Menu item not found' });
        }
        res.status(500).json({ success: false, error: 'Server Error toggling availability' });
    }
};

export const createMenuItemAdmin = async (req, res, next) => {
  try {
    const { name, description, price, category, availabilityNote } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'Name, price, and category are required' });
    }
     if (!['ጾም', 'ፍስክ', 'መጠጥ'].includes(category)) {
       return res.status(400).json({ success: false, error: 'Invalid category value' });
    }

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
        const fileUri = formatBufferToDataURI(req.file);
        if (!fileUri) {
             return res.status(400).json({ success: false, error: 'Invalid image file format.' });
        }
        try {
            const uploadResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "digital-menu-adama"
            });
            imageUrl = uploadResponse.secure_url;
            imagePublicId = uploadResponse.public_id;
        } catch (uploadError) {
            return res.status(500).json({ success: false, error: 'Image upload failed.' });
        }
    }

    const newItem = await MenuItem.create({
      name, description, price, category, availabilityNote,
      imageUrl,
    });
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error creating menu item' });
  }
};


export const updateMenuItemAdmin = async (req, res, next) => {
  try {
    let item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }

    const { name, description, price, category, availabilityNote, removeImage } = req.body;
    const updateData = { name, description, price, category, availabilityNote };

    if (category && !['ጾም', 'ፍስክ', 'መጠጥ'].includes(category)) {
       return res.status(400).json({ success: false, error: 'Invalid category value' });
    }

    let newImageUrl = item.imageUrl;

     if (removeImage === 'true' && item.imageUrl) {
          newImageUrl = null;
     }

    if (req.file) {
         const fileUri = formatBufferToDataURI(req.file);
          if (!fileUri) {
             return res.status(400).json({ success: false, error: 'Invalid image file format.' });
          }
        try {
            const uploadResponse = await cloudinary.uploader.upload(fileUri.content, {
                 folder: "digital-menu-adama"
             });
            newImageUrl = uploadResponse.secure_url;
        } catch (uploadError) {
            return res.status(500).json({ success: false, error: 'Image upload failed.' });
        }
    }

    updateData.imageUrl = newImageUrl;

    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, {
      new: true, runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedItem });
  } catch (err) {
     if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: messages });
    }
     if (err.name === 'CastError') {
        return res.status(404).json({ success: false, error: 'Menu item not found' });
     }
    res.status(500).json({ success: false, error: 'Server Error updating menu item' });
  }
};


export const deleteMenuItemAdmin = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }

    await item.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.name === 'CastError') {
       return res.status(404).json({ success: false, error: 'Menu item not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error deleting menu item' });
  }
};