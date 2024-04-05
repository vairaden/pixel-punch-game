import express from 'express';
import { router as authRouter } from './auth.router';
import { router as topicRouter } from './topic.router';
import { router as commentRouter } from './comment.router';
import { router as topicReactionRouter } from './topicReaction.router';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/topic', topicRouter);
router.use('/comment', commentRouter);
router.use('/topic-reaction', topicReactionRouter);

export { router };
