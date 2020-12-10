import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AuthController from './Controllers/AdminControllers/AuthController';
import ItemsController from './Controllers/AdminControllers/ItemsController';

const routes = Router();

const authController = new AuthController();
const itemsController = new ItemsController();

routes.post('/admin/login', authController.index);
routes.post('/admin/register', authController.create);

routes.post('/item/create', multer(multerConfig).single("file"), itemsController.create);

export default routes;
