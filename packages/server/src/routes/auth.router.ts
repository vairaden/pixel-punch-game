import express from 'express';
import { authController } from '../controllers';

export const router = express.Router();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/user', authController.getUserInfo);
router.post('/logout', authController.logout);
