import { Request, Response } from 'express';
import { TopicReaction, UserReaction } from '../models';

class TopicReactoinController {
  async updateReaction(req: Request, res: Response) {
    const { topic_id: topicId } = req.params;
    const { reaction_name: reactionName } = req.body;

    if (!topicId) {
      res.status(400).send('Bad request');
      return;
    }

    const userId = res.locals.user.id;

    console.log(topicId, reactionName, userId);

    try {
      // Пользователь убрал реакцию с поста
      if (!reactionName) {
        TopicReaction.destroy({
          where: {
            user_id: userId,
            topic_id: topicId,
          },
        });
        res.send('Deleted');
        return;
      }

      const [reaction] = await TopicReaction.findOrCreate({
        where: {
          user_id: userId,
          topic_id: topicId,
        },
        defaults: {
          reaction_name: reactionName,
        },
      });

      reaction.update({ reaction_name: reactionName });
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
