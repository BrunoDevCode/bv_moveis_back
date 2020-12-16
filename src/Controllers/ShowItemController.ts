import { Response, Request, NextFunction } from 'express';
import Item from '../Models/Item';

export default class ShowItemController {
  async index(request: Request, response: Response, next: NextFunction) {
    const { itemID } = request.params;

    try {
      const item = await Item.findById(itemID).populate('images');

      if (!item) {
        const error = new Error('Item not exists!');
        error.status = 409;
        next(error);
        return;
      }

      return response.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
}
