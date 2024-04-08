import express from 'express';
import { userController } from '../controllers';
import { auth } from '../middlewares/auth';

export const router = express.Router();

router.put('/theme', auth, userController.updateTheme);
router.get('/theme', auth, userController.getTheme);
