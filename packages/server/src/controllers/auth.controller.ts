import { NextFunction, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import { ENDPOINT_URL, YANDEX_HOST_URL } from '../configs';

const NODE_HOST_URL = (req: Request) => {
  return process.env.NODE_ENV === 'development'
    ? 'localhost'
    : req.headers.host;
};

const handleProxy = (
  req: Request,
  res: Response,
  next: NextFunction,
  endpoint: string
) => {
  proxy(YANDEX_HOST_URL, {
    proxyReqPathResolver() {
      return ENDPOINT_URL + endpoint; // Указываем полный путь к методу аутентификации
    },
    userResHeaderDecorator(headers) {
      // Перехватываем заголовки ответа от стороннего сервиса и обрабатываем куки
      if (headers['set-cookie']) {
        // Переопределяем домен для каждой куки из заголовка 'Set-Cookie'
        headers['set-cookie'] = headers['set-cookie'].map(cookie => {
          return cookie.replace(
            /Domain=[^;]+/gi,
            `Domain=${NODE_HOST_URL(req)}`
          );
        });
      }
      return headers;
    },
  })(req, res, next);
};

class AuthController {
  async signin(req: Request, res: Response, next: NextFunction) {
    handleProxy(req, res, next, 'signin');
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    handleProxy(req, res, next, 'signup');
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    handleProxy(req, res, next, 'user');
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    handleProxy(req, res, next, 'logout');
  }
}

const authController = new AuthController();

export { authController };
