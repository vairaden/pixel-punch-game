import { Request, Response } from 'express';
import { Theme } from '../models/theme.model';

class UserController {
  async getTheme(_: Request, res: Response) {
    const { id } = res.locals.user;
    const [themeRecord] = await Theme.findOrCreate({
      where: { user_id: id },
      defaults: {
        theme: 'light',
        user_id: id,
      },
    });

    res.status(200).json({ theme: themeRecord.theme });
  }

  async updateTheme(req: Request, res: Response) {
    const { id } = res.locals.user;
    const { theme } = req.body;

    if (!theme) {
      res.status(400).send('Bad response');
      return;
    }

    try {
      const themeRecord = await Theme.findOne({ where: { user_id: id } });

      if (!themeRecord) {
        res.status(404).send('Not found');
        return;
      }

      await themeRecord.update({ theme });
      res.status(200).send(theme);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const userController = new UserController();

export { userController };
