import { Router } from 'express';

import auth from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MessageController from './app/controllers/MessageController';

const routes = Router();

routes.post('/signin', SessionController.create);
routes.post('/signup', UserController.store);

routes.use(auth);

routes.get('/users', UserController.index);

routes.get('/message/recents', MessageController.listUsers);
routes.post('/message', MessageController.store);
routes.get('/message/list', MessageController.index);
routes.patch('/messages', MessageController.update);

routes.get('/me', UserController.show);

export default routes;
