import { Request, Response } from 'express';

export default class AdminController {
  async index(request: Request, response: Response) {
    const { email, password } = request.body;
  }
}