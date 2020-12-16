import { Request, Response, NextFunction } from 'express';
import Item from '../Models/Item';

export default class ShowItemsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const homepageItems = await Item.find({ isHomepage: true })
        .limit(6)
        .populate('images');

      return response.status(200).json(homepageItems);
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
