import express from 'express';
import { commentController } from '../controllers';
import { auth } from '../middlewares/auth';

export const router = express.Router();

router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getCommentsByTopicId);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);
router.post('/', auth, commentController.createComment);
