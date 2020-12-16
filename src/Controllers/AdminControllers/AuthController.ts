import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
// eslint-disable-next-line import/extensions
import { secret } from '../../config/auth.json';
import User from '../../Models/User';

export default class AuthController {
  async index(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    if (!email || !password) {
      const error = new Error('Por favor preencha todos os campos');
      error.status = 400;
      next(error);
      return;
    }

    try {
      const findUser = await User.findOne({ email }).select('+password');

      if (!findUser) {
        const error = new Error('Usuário não encontrado, tente novamente');
        error.status = 400;
        next(error);
        return;
      }

      if (!await compare(password, findUser!.password)) {
        const error = new Error('Senha invalída, tente novamente');
        error.status = 401;
        next(error);
        return;
      }

      findUser!.password = '';

      const { _id } = findUser;

      const token = sign({ _id }, secret, { expiresIn: 86400 });

      return response.json({ token });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response) {
    const { email, password, name } = request.body;

    await User.create({
      email,
      name,
      password,
    });

    return response.send();
  }
}
