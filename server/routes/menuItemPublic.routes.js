 import express from 'express';
 
import {
    getAvailableMenuItems,
    getSingleAvailableMenuItem
} from '../controllers/menuItemPublic.controller.js';

const router = express.Router();

router.route('/')
  .get(getAvailableMenuItems);

 router.route('/:id')
    .get(getSingleAvailableMenuItem);

export default router;