import express from 'express';
import { commentController } from '../controllers/comment.controller';

export const router = express.Router();

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentsByTopicId);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.post('/', commentController.createComment);
