import 'dotenv/config';

import Queue from './lib/Queue';
// Executa aplicação para fila de envio de email's
Queue.processQueue();
