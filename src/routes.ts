import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ShowItemsController from './Controllers/ShowItemsController';
import AuthController from './Controllers/AdminControllers/AuthController';
import ItemController from './Controllers/AdminControllers/ItemController';
import ImagesController from './Controllers/AdminControllers/ImagesController';

import HomepageController from './Controllers/HomepageController';

import TokenMiddleware from './Middleware/TokenMiddleware';

const routes = Router();

const showItemsController = new ShowItemsController();
const authController = new AuthController();
const itemController = new ItemController();
const imagesController = new ImagesController();
const homepageController = new HomepageController();

routes.get('/', (req, res) => {
  res.redirect('/items');
});

routes.get('/homepage', homepageController.index);

routes.get('/items', showItemsController.show);

routes.get('/images/:itemID', imagesController.index);
routes.post('/admin/image/upload', TokenMiddleware, multer(multerConfig).single('file'), imagesController.create);
routes.put('/admin/image/update/:imageID', TokenMiddleware, imagesController.update);
routes.delete('/admin/image/delete/:imageID', TokenMiddleware, imagesController.destroy);

routes.get('/item/:itemID', showItemsController.index);
routes.post('/admin/item/create', TokenMiddleware, itemController.create);
routes.put('/admin/:itemID/update', TokenMiddleware, itemController.update);
routes.delete('/admin/item/delete/:itemID', TokenMiddleware, itemController.destroy);

routes.post('/admin/login', authController.index);
routes.post('/admin/register', authController.create);

export default routes;
