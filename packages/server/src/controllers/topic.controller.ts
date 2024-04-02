import { Request, Response } from 'express';
import { Topic } from '../models';

class TopicController {
  async getAllTopics(_: Request, res: Response) {
    try {
      const allTopics = await Topic.findAll();
      res.send(allTopics);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getTopicById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send('Bad request');
      return;
    }

    try {
      const topic = await Topic.findByPk(id);

      if (!topic) {
        res.status(404).send('Not found');
        return;
      }

      res.send(topic);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async createTopic(req: Request, res: Response) {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        res.status(400).send('Bad response');
        return;
      }

      const data = {
        title,
        content,
        author: res.locals.user,
      };

      const topic = await Topic.create(data);

      res.send(topic);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async updateTopic(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).send('Bad response');
      return;
    }

    try {
      const topic = await Topic.findByPk(id);

      if (!topic) {
        res.status(404).send('Not found');
        return;
      }

      if (topic.author.id !== res.locals.user.id) {
        res.status(403).send('Forbidden');
        return;
      }

      const data = {
        title,
        content,
      };

      topic.update(data);
      res.send(topic);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async deleteTopic(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const topic = await Topic.findByPk(id);

      if (!topic) {
        res.status(404).send('Not found');
        return;
      }

      if (topic.author.id !== res.locals.user.id) {
        res.status(403).send('Forbidden');
        return;
      }

      topic.destroy();

      res.send('Deleted');
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const topicController = new TopicController();

export { topicController };
