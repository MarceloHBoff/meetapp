import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

import SubscribeMail from '../jobs/SubscribeMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              attributes: ['name'],
              required: true,
            }, {
              model: File,
              attributes: ['id', 'url', 'path'],
              required: true,
            },
          ],
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    // Busca informações da MeetUp
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: {
        model: User,
      },
    });
    // Se a MeetUp não existe
    if (!meetup) {
      return res.status(400).json({ error: 'MeetUp does not exists!' });
    }
    // Se o usuário for o organizador da MeetUp
    if (meetup.user_id === req.userId) {
      return res.status(400).json({ error: "User can't subscribe on MeetUp!" });
    }
    // Se MeetUp já ocorreu
    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe past meetups!" });
    }
    // Busca informações da inscrição
    const subscription = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: req.userId,
      },
    });
    // Se usuário já está inscrito
    if (subscription) {
      return res.status(400).json({ error: 'User is subscribe on MeetUp!' });
    }
    // Busca inscrições do usuário na data da MeetUp
    const checkDate = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });
    // Se usuário já está inscrito em uma MeetUp na mesma data
    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }
    // Cria inscrição
    const sub = await Subscription.create({
      user_id: req.userId,
      meetup_id: req.params.meetupId,
    });
    // Monta os dados para envio do email
    await Queue.add(SubscribeMail.key, { meetup });
    return res.json(sub);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(400).json({ error: 'User not subscribe in this meetup!' });
    }

    if (subscription.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'User does not have permission to delete!' });
    }

    await subscription.destroy();
    return res.json(subscription);
  }
}

export default new SubscriptionController();
