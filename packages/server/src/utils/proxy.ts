import { NextFunction, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import { ENDPOINT_URL, YANDEX_HOST_URL } from '../configs';

export const proxyReq = (
  req: Request,
  res: Response,
  next: NextFunction,
  endpoint?: string
) => {
  proxy(YANDEX_HOST_URL, {
    proxyReqPathResolver(req) {
      if (endpoint) {
        return encodeURIComponent(ENDPOINT_URL + endpoint); // Указываем полный путь к методу аутентификации
      } else {
        return encodeURIComponent(ENDPOINT_URL + req.url);
      }
    },
    userResHeaderDecorator(headers) {
      // Перехватываем заголовки ответа от стороннего сервиса и обрабатываем куки
      if (headers['set-cookie']) {
        // Убираем домен для каждой куки из заголовка 'Set-Cookie'
        headers['set-cookie'] = headers['set-cookie'].map(cookie => {
          return cookie.replace(/Domain=[^;]+;?/gi, '');
        });
      }
      return headers;
    },
  })(req, res, next);
};
