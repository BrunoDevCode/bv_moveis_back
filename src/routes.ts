import { Router, Request, Response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ShowItemsController from './Controllers/ShowItemsController';
import ShowItemController from './Controllers/ShowItemController';

import AuthController from './Controllers/AdminControllers/AuthController';
import ItemController from './Controllers/AdminControllers/ItemController';
import ImagesController from './Controllers/AdminControllers/ImagesController';

import HomepageController from './Controllers/HomepageController';

import TokenMiddleware from './Middleware/TokenMiddleware';

const routes = Router();

const showItemsController = new ShowItemsController();
const showItemController = new ShowItemController();
const authController = new AuthController();
const itemController = new ItemController();
const imagesController = new ImagesController();
const homepageController = new HomepageController();

routes.get('/homepage', homepageController.index);

routes.get('/items/homepage', showItemsController.index);
routes.get('/items', showItemsController.show);
routes.get('/item/:itemID', showItemController.index);
routes.get('/homepage/images', imagesController.show);

routes.post('/admin/login', authController.index);
routes.post('/admin/register', authController.create);

routes.post('/admin/item/create', TokenMiddleware, itemController.create);

routes.post('/admin/image/upload', TokenMiddleware, multer(multerConfig).single('file'), imagesController.create);
routes.delete('/admin/image/delete/:imageID', TokenMiddleware, imagesController.destroy);

routes.delete('/admin/item/delete/:itemID', TokenMiddleware, itemController.destroy);

export default routes;
