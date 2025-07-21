import express from 'express'
import { protectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUsersForSidebar, sendMessages } from '../appControllers/messageControl.js';

const router=express.Router();

router.get('/users',protectRoute,getUsersForSidebar)
router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendMessages)


export default router