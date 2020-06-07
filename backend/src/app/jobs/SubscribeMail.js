import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscribeMail {
  get key() {
    return 'SubscribeMail';
  }

  async handle({ data }) {
    const { meetup } = data;

    await Mail.sendMail({
      to: `${meetup.User.name}<${meetup.User.email}>`,
      subject: 'Inscrição na MeetUp',
      template: 'subscribe',
      context: {
        organizer: meetup.User.name,
        title: meetup.title,
        location: meetup.location,
        description: meetup.description,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscribeMail();
