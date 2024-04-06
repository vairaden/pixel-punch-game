import { Request, Response } from 'express';
import { TopicReaction, UserReaction } from '../models';

class TopicReactoinController {
  async updateReaction(req: Request, res: Response) {
    const { topic_id } = req.params;
    const { reaction_name } = req.body;

    if (!topic_id) {
      res.status(400).send('Bad request');
      return;
    }

    const userId = res.locals.user.id;

    try {
      // Пользователь убрал реакцию с поста
      if (!reaction_name) {
        TopicReaction.destroy({
          where: {
            user_id: userId,
            topic_id,
          },
        });
        res.send('Deleted');
        return;
      }

      const [reaction] = await TopicReaction.findOrCreate({
        where: {
          user_id: userId,
          topic_id,
        },
        defaults: {
          reaction_name,
        },
      });

      reaction.update({ reaction_name });
      res.send('Updated');
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getReactionDictionary(_: Request, res: Response) {
    try {
      const userReactionDictionary = await UserReaction.findAll();
      res.send(userReactionDictionary);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const topicReactionController = new TopicReactoinController();

export { topicReactionController };
