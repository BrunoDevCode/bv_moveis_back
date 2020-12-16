import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { RequestUser } from '../@types/requestUser';
// eslint-disable-next-line import/extensions
import { secret } from '../config/auth.json';

interface TokenProps {
  _id: string;
  iat: number;
  exp: number;
}

function TokenMiddleware(request: RequestUser, response: Response, next: NextFunction) {
  const token = request.headers.authorization;

  if (!token) {
    const error = new Error('Token is not provided!');
    error.status = 401;
    next(error);
  }

  try {
    const decodedToken = <TokenProps> verify(token!, secret);

    if (!decodedToken._id) {
      const error = new Error('Token is malformated!');
      error.status = 401;
      next(error);
    }

    request.userID = decodedToken._id;

    next();
  } catch (error) {
    next(error);
  }
}

export default TokenMiddleware;
