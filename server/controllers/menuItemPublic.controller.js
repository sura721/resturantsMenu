 import MenuItem from '../models/MenuItem.js';

export const getAvailableMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error fetching available menu' });
  }
};

export const getSingleAvailableMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findOne({
        _id: req.params.id,
        isAvailable: true
    });

    if (!item) {
      return res.status(404).json({ success: false, error: 'Menu item not found or is unavailable' });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
     if (err.name === 'CastError') {
        return res.status(404).json({ success: false, error: 'Menu item not found' });
     }
    res.status(500).json({ success: false, error: 'Server Error fetching menu item' });
  }
};