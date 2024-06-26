import { Response, Request, NextFunction } from 'express';
import axios from 'axios';
import { ENDPOINT_URL, YANDEX_HOST_URL } from '../configs';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    res.status(403).send('Forbiden');
    return;
  }

  try {
    const getUserRes = await axios.get(
      YANDEX_HOST_URL + ENDPOINT_URL + '/auth/user',
      {
        headers: {
          cookie: req.headers.cookie,
        },
        withCredentials: true,
      }
    );

    if (getUserRes.status === 200) {
      res.locals.user = getUserRes.data;
      return next();
    } else {
      res.status(403).send('Forbiden');
      return;
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
