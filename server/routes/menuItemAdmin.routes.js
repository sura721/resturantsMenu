 import express from 'express';
import {
    getAllMenuItemsAdmin,
    toggleAvailability,
    createMenuItemAdmin,
    updateMenuItemAdmin,
    deleteMenuItemAdmin
} from '../controllers/menuItemAdmin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingleImage } from '../middleware/multer.middleware.js'; 
const router = express.Router();

router.use(protect);

router.route('/')
    .get(getAllMenuItemsAdmin)
  
    .post(uploadSingleImage, createMenuItemAdmin);

router.route('/:id')
   
    .put(uploadSingleImage, updateMenuItemAdmin)
    .delete(deleteMenuItemAdmin);

router.patch('/:id/toggle', toggleAvailability);

export default router;