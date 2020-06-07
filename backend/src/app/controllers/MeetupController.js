import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async show(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          required: true,
        },
        {
          model: File,
          attributes: ['id', 'url', 'path'],
          required: true,
        },
      ],
    });

    return res.json(meetup);
  }

  async user(req, res) {
    const meetup = await Meetup.findAll({
      where: { user_id: req.userId },
    });

    return res.json(meetup);
  }

  async index(req, res) {
    const where = {};

    const { pages = 1 } = req.query;

    if (req.query.date) {
      where.date = {
        [Op.between]: [
          startOfDay(parseISO(req.query.date)),
          endOfDay(parseISO(req.query.date)),
        ],
      };
    }

    const meetup = await Meetup.findAll({
      where,
      include: [User, File],
      limit: 2,
      offset: (pages - 1) * 2,
    });

    return res.json(meetup);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      banner_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, banner_id, date } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited!' });
    }

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      banner_id,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      banner_id: Yup.number(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'User does not have permission to alterate!' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid!' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups!" });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup invalid!' });
    }

    if (meetup.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'User does not have permission to delete!' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups!" });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
