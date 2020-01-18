import React, { useState, useEffect } from 'react';
import { MdCreate, MdDeleteForever, MdRoom, MdEvent } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  ButtonDelete,
  ButtonEdit,
  Content,
  Information,
} from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Detail({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetup/${id}`);
      setMeetup({
        ...response.data,
        dateFormatted: format(
          parse(meetup.date),
          'D [de] MMMM[, ás] HH[h]mm[min]',
          {
            locale: pt,
          }
        ),
      });
    }
    loadMeetup();
  }, [id, meetup.date]);

  async function handleCancel(MeetupId) {
    try {
      await api.delete(`meetup/${MeetupId}`);
      toast.success('Meetup deletada com sucesso!');

      history.push('/dashboard');
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Connection error.');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <ButtonEdit
            type="button"
            onClick={() => history.push(`/meetup/${meetup.id}`)}
          >
            <MdCreate color="#fff" size={18} />
            Editar
          </ButtonEdit>
          <ButtonDelete type="button" onClick={() => handleCancel(meetup.id)}>
            <MdDeleteForever color="#fff" size={18} />
            Cancelar
          </ButtonDelete>
        </div>
      </header>
      <Content>
        <img src={meetup.File && meetup.File.url} alt={meetup.title} />
        <p>{meetup.description}</p>
        <Information>
          <div>
            <MdEvent color="#fff" size={18} />
            <span>{meetup.dateFormatted}</span>
          </div>
          <div>
            <MdRoom color="#fff" size={18} />
            <span>{meetup.location}</span>
          </div>
        </Information>
      </Content>
    </Container>
  );
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
