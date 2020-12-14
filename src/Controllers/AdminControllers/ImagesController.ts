import { Request, Response, NextFunction } from 'express';
import type RequestFile from '../../@types/requestFile';
import { Image } from '../../Models/Image';

export default class ImagesController {
  async create(request: RequestFile, response: Response, next: NextFunction) {
    const { originalname: name, size, key, location: url = "" } = request.file;
    const { itemID } = request.body;

    try {
      const imageSave = await Image.create({
        name,
        size,
        key,
        url,
        itemID
      });

      return response.send(imageSave);
    } catch (error) {
      next(error);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    const { imageID } = request.params;

    try {
      await Image.findByIdAndDelete(imageID)

      return response.status(200).send();
    } catch (error) {
      next(error)
    }
  }
}