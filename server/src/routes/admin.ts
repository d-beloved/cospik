import { Router } from 'express';
import adminController from './../controllers/admin';
import Validation from './../validation/index';
import ifAdminExists from './../utils/isAdminExist';
import { loginStatus } from './../utils/authStatus';


const routes = Router();

routes.post('/signup',
  Validation.checkBodyContains('username', 'password'),
  ifAdminExists,
  adminController.createAdmin
);

routes.post('/login',
  Validation.checkBodyContains('username', 'password'),
  loginStatus,
  adminController.adminLogin
);

export default routes;
