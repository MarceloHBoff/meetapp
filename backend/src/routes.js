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
// Gravação do usuário
routes.post('/users', UserController.store);
// Iniciar sessão do usuário
routes.post('/sessions', SessionController.store);

// Middlewares de validação da sessão
routes.use(authMiddleware);
// Altera usuário
routes.put('/users', UserController.update);
// Lista as MeetUps criadas pelo usuário
routes.get('/meetup', MeetupController.index);
routes.get('/meetup/user', MeetupController.user);
routes.get('/meetup/:id', MeetupController.show);
// Cria MeetUps
routes.post('/meetup', MeetupController.store);
// Altera a MeetUps
routes.put('/meetup/:id', MeetupController.update);
// Deleta a MeetUps
routes.delete('/meetup/:id', MeetupController.delete);
// Lista incrições
routes.get('/subscription', SubscriptionController.index);
// Cancela incrição
routes.delete('/subscription/:id', SubscriptionController.delete);
// Increve usuário na MeetUp
routes.post('/meetup/:meetupId/subscription', SubscriptionController.store);
// Faz upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
