import { Request, Response, NextFunction } from 'express';
import { RequestUser } from '../../@types/requestUser';
import Image from '../../Models/Image';
import Item, { IItem } from '../../Models/Item';

export default class ItemController {
  async create(request: RequestUser, response: Response, next: NextFunction) {
    const {
      title, description, isHomepage, isAvailable,
    } = request.body;
    const { userID } = request;

    try {
      if (await Item.findOne({ title: { $regex: `^${title}$`, $options: 'gi' }, user: userID })) {
        const error = new Error('Items is already exists!');
        error.status = 400;
        next(error);
        return;
      }

      const { _id } = await Item.create({
        title,
        description,
        isHomepage,
        isAvailable,
        user: userID,
      });

      return response.status(201).json({ itemID: _id });
    } catch (error) {
      next(error);
    }
  }

  async update(request: RequestUser, response: Response, next: NextFunction) {
    const { itemID } = request.params;
    const {
      title, description, isHomepage, isAvailable,
    } = request.body;

    try {
      await Item.findByIdAndUpdate(itemID, {
        title,
        description,
        isHomepage,
        isAvailable,
      });

      return response.status(203).send();
    } catch (error) {
      next(error);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    const { itemID } = request.params;
    try {
      const item = <IItem> await Item.findById(itemID);

      if (item!.images!.length > 0) {
        item!.images!.forEach(async (image) => {
          await Image.findByIdAndRemove(image._id);
        });
      }

      await Item.findByIdAndRemove(itemID);

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
