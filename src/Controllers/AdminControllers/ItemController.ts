import { Request, Response, NextFunction } from 'express';
import { RequestUser } from '../../@types/requestUser';
// import Image from '../../Models/Image';
import Item from '../../Models/Item';

export default class ItemController {
  async create(request: RequestUser, response: Response, next: NextFunction) {
    const { title, description, isHomepage } = request.body;
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
        user: userID,
      });

      return response.status(201).json({ itemID: _id });
    } catch (error) {
      next(error);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    const { itemID } = request.params;
    try {
      // const { images } = await Item.findByIdAndRemove(itemID);

      console.log(images);

      // images.map((image) => Image.findByIdAndDelete(image._id));

      // Apagar todas as images do item que foi apagado

      // if (images.length !== 0) {
      //   for (const image of images) {
      //     await Image.findByIdAndDelete(image._id);
      //   }
      // }

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
