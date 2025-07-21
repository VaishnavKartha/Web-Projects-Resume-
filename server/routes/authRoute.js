import express from 'express'
import { checkAuth, deleteAccount, logIn, logOut, signUp,resetPassword } from '../appControllers/authControl.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router=express.Router();


router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/logout',logOut);
router.put('/resetpass',resetPassword);
router.post('/delete',protectRoute,deleteAccount)
router.get('/check',protectRoute,checkAuth)


export default router