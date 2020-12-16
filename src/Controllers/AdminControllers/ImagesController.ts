import { Request, Response, NextFunction } from 'express';
import type RequestFile from '../../@types/requestFile';
import Image from '../../Models/Image';
import Item from '../../Models/Item';

export default class ImagesController {
  async create(request: RequestFile, response: Response, next: NextFunction) {
    const {
      originalname: name, size, key, location: url = '',
    } = request.file;

    const { itemID } = request.body;

    if (!await Item.findById(itemID)) {
      const error = new Error('Item not exists!');
      error.status = 409;
      next(error);
      return;
    }

    try {
      const imageSave = await Image.create({
        name,
        size,
        key,
        url,
        itemAssigned: itemID,
      });

      await Item.findByIdAndUpdate(itemID, { $push: { images: imageSave._id } }, { new: true });

      return response.send(imageSave);
    } catch (error) {
      next(error);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    const { imageID } = request.params;

    try {
      await Image.findByIdAndDelete(imageID);

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
