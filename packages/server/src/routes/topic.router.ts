import express from 'express';
import { topicController } from '../controllers';
import { auth } from '../middlewares/auth';

export const router = express.Router();

router.get('/', auth, topicController.getAllTopics);
router.post('/', auth, topicController.createTopic);
router.put('/:id', auth, topicController.updateTopic);
router.delete('/:id', auth, topicController.deleteTopic);
