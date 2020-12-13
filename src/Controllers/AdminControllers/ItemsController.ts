import { Request, Response } from 'express';
import { Item } from '../../Models/Item';
import { Image } from '../../Models/Image';

export default class ItemsController {
  async create(request: Request, response: Response) {
    const { originalname: name, size, key, location: url = "" } = request.file;
    // const { title, description, inStock} = request.body;

    const imageSave = await Image.create({
      name,
      size,
      key,
      url
    });

    return response.send(imageSave);
  }
}