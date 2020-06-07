import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parse } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Meetups, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetup/user');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          dateFormatted: format(
            parse(meetup.date),
            'D [de] MMMM[, ás] HH[h]mm[min]',
            {
              locale: pt,
            },
          ),
        };
      });

      setMeetups(data);
    }
    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetup</h1>

        <button type="button" onClick={() => history.push('/meetup')}>
          <MdAddCircleOutline color="#fff" size={18} />
          Novo meetup
        </button>
      </header>

      <Meetups>
        {meetups.map(meetup => (
          <Meetup key={String(meetup.id)}>
            <strong>{meetup.title}</strong>

            <div>
              <span>{meetup.dateFormatted}</span>

              <Link to={`/detail/${meetup.id}`}>
                <MdChevronRight color="#fff" size={20} />
              </Link>
            </div>
          </Meetup>
        ))}
      </Meetups>
    </Container>
  );
}
