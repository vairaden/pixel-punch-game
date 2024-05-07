import { NextFunction, Request, Response } from 'express';
import { proxyReq } from '../utils/proxy';

class AuthController {
  async signin(req: Request, res: Response, next: NextFunction) {
    proxyReq(req, res, next, '/auth/signin');
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    proxyReq(req, res, next, '/auth/signup');
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    proxyReq(req, res, next, '/auth/user');
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    proxyReq(req, res, next, '/auth/logout');
  }

  async yandexOAuth(req: Request, res: Response, next: NextFunction) {
    proxyReq(req, res, next, '/api/v2/oauth/yandex/service-id');
  }
}

const authController = new AuthController();

export { authController };
