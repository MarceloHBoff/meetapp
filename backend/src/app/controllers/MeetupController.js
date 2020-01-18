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
    // Monta schema de validação da MeetUp
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      banner_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    // Se teve alguma informação inválida
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Busca informações da MeetUp
    const {
      title, description, location, banner_id, date,
    } = req.body;
    // Converte data para formato UTC
    const hourStart = startOfHour(parseISO(date));
    // Se data for anterior a data atual
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited!' });
    }
    // Cria a MeetUp
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
    // Monta schema de validação da MeetUp
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      banner_id: Yup.number(),
      date: Yup.date(),
    });
    // Se teve alguma informação inválida
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    // Busca os dados da MeetUp
    const meetup = await Meetup.findByPk(req.params.id);
    // Se usuário não for o organizador da MeetUp
    if (meetup.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'User does not have permission to alterate!' });
    }
    // Se nova data já passou
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid!' });
    }
    // Se MeetUp já ocorreu
    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups!" });
    }
    // Altera MeetUp
    await meetup.update(req.body);
    return res.json(meetup);
  }

  async delete(req, res) {
    // Busca os dados da MeetUp
    const meetup = await Meetup.findByPk(req.params.id);
    // Se a MeetUp não existe
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup invalid!' });
    }
    // Se usuário não for o organizador da MeetUp
    if (meetup.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'User does not have permission to delete!' });
    }
    // Se MeetUp já ocorreu
    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups!" });
    }
    await meetup.destroy();
    return res.json(meetup);
  }
}

export default new MeetupController();
