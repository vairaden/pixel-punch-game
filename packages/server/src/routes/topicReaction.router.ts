import express from 'express';
import { topicReactionController } from '../controllers';
import { auth } from '../middlewares/auth';

export const router = express.Router();

router.get('/dictionary', auth, topicReactionController.getReactionDictionary);
router.post('/:topic_id', auth, topicReactionController.updateReaction);
