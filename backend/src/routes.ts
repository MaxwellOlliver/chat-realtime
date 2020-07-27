import { Router } from 'express';

import auth from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.use(auth);

routes.post('/signin', SessionController.create);

export default routes;
