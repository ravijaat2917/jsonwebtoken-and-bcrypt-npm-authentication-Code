import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

//Public  routes
router.get('/home' , userController.homePage);
router.post('/register' , userController.registerUser);
router.post('/login' , userController.login);

// Protected Routes


export default router;