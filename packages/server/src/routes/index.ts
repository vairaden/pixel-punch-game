import express from 'express';
import { router as topicRouter } from './topic.router';
import { router as commentRouter } from './comment.router';

const router = express.Router();

router.use('/topic', topicRouter);
router.use('/comment', commentRouter);

export { router };
