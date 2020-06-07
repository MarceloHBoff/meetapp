import Router from 'express';
import Multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = Multer(MulterConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/meetup', MeetupController.index);
routes.get('/meetup/user', MeetupController.user);
routes.get('/meetup/:id', MeetupController.show);
routes.post('/meetup', MeetupController.store);
routes.put('/meetup/:id', MeetupController.update);
routes.delete('/meetup/:id', MeetupController.delete);

routes.post('/meetup/:meetupId/subscription', SubscriptionController.store);

routes.get('/subscription', SubscriptionController.index);
routes.delete('/subscription/:id', SubscriptionController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
