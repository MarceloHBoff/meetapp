import Bee from 'bee-queue';
import SubscribeMail from '../app/jobs/SubscribeMail';
import redisConfig from '../config/redis';

const jobs = [SubscribeMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // Percorre os jobs para inicializar a configuração do REGIS
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Adiciona jobs na fila de execução
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    // Percorres os jobs adicionados para executalos
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  // Exibe o erro de execução do job
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
