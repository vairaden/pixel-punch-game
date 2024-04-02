import { Comment } from '../models';
import { Topic } from '../models';
import { Request, Response } from 'express';
import { Author } from '../types';

class CommentController {
  async getAllComments(_: Request, res: Response) {
    try {
      const comments = await Comment.findAll();
      res.send(comments);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getCommentsByTopicId(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send('Bad request');
      return;
    }

    interface CommentData {
      id: number;
      content: string;
      author: Author;
      replies: CommentData[];
    }

    function buildCommentTree(
      comments: Comment[],
      parentId: number | null = null
    ): CommentData[] {
      const commentTree: CommentData[] = [];

      comments.forEach(comment => {
        if (comment.dataValues.reply_id === parentId) {
          const commentData: CommentData = {
            ...comment.dataValues,
            replies: buildCommentTree(comments, comment.dataValues.id), // Рекурсивно вызываем функцию для поиска ответов
          };
          commentTree.push(commentData);
        }
      });

      return commentTree;
    }

    try {
      const commentsByTopic = await Comment.findAll({
        where: { topic_id: id },
      });

      const data = buildCommentTree(commentsByTopic);
      res.send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async createComment(req: Request, res: Response) {
    const { author, content, topic_id, reply_id } = req.body;

    try {
      const topic = await Topic.findOne({ where: { id: topic_id } });

      if (!topic) {
        res.status(400).send('Bad request');
        return;
      }

      const data = {
        author,
        content,
        topic_id,
        reply_id: null,
      };

      if (reply_id) {
        data.reply_id = reply_id;
      }

      const comment = await Comment.create(data);

      res.send(comment);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async updateComment(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const comment = await Comment.findByPk(id);

      if (!comment) {
        res.status(404).send('Not found');
        return;
      }

      if (comment.author.id !== content.author.id) {
        res.status(401).send('Do not have access');
        return;
      }

      const data = {
        ...content,
      };

      comment.update(data);

      res.send(comment);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async deleteComment(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const comment = await Comment.findByPk(id);

      if (!comment) {
        res.status(404).send('Not found');
        return;
      }

      comment.update({
        ...comment,
        content: 'Этот комментарий был удален...',
      });

      res.send('Deleted');
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const commentController = new CommentController();

export { commentController };
