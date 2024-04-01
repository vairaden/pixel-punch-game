import { Response, Request, NextFunction } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    res.status(403).send('Forbiden');
    return;
  }

  return next();
};
