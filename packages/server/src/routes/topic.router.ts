import express from 'express';
import { topicController } from '../controllers/topic.controller';

export const router = express.Router();

router.get('/', topicController.getAllTopics);
router.post('/', topicController.createTopic);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);
