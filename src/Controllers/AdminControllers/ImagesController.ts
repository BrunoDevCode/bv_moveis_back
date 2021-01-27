import { Request, Response, NextFunction } from 'express';
import type RequestFile from '../../@types/requestFile';
import Image from '../../Models/Image';
import Item from '../../Models/Item';

export default class ImagesController {
  async index(request: RequestFile, response: Response, next: NextFunction) {
    const { itemID } = request.params;

    if (!itemID) {
      const error = new Error('ItemID is not provided!');
      error.status = 409;
      next(error);
    }

    const images = await Image.find({ itemAssigned: itemID });

    return response.status(200).json(images);
  }

  async create(request: RequestFile, response: Response, next: NextFunction) {
    const {
      originalname: name, size, key, location: url = '',
    } = request.file;

    const { itemID, isHomepage } = request.body;

    if (!itemID) {
      const error = new Error('ItemID is not provided!');
      error.status = 409;
      next(error);
      return;
    }

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
        isHomepage,
      });

      await Item.findByIdAndUpdate(itemID, { $push: { images: imageSave._id } }, { new: true });

      return response.send(imageSave);
    } catch (error) {
      next(error);
    }
  }

  async update(request: RequestFile, response: Response, next: NextFunction) {
    const { isHomepage } = request.body;
    const { imageID } = request.params;

    try {
      await Image.findByIdAndUpdate(imageID, { $set: { isHomepage } });

      const image = await Image.findOne({ _id: imageID });
      return response.status(200).json(image);
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
