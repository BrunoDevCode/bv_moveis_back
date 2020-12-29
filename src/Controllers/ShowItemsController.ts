import { Request, Response, NextFunction } from 'express';
import Item from '../Models/Item';

export default class ShowItemsController {
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

  async show(request: Request, response: Response) {
    const arrayOfItems = await Item.find().populate({
      path: 'images',
      select: 'url',
      options: { limit: 1 },
    });

    return response.status(200).json(arrayOfItems);
  }
}
