import { Request, Response, NextFunction } from 'express';
import Item from '../Models/Item';
import Image from '../Models/Image';

export default class HomepageController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const items = await Item.find({ isHomepage: true })
        .limit(6)
        .populate({
          path: 'images',
          select: 'url',
          options: { limit: 1 },
        });

      const images = await Image.find({ isHomepage: true });

      const data = {
        items,
        images,
      };

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
