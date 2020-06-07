import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { parse } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';

import api from '../../services/api';
import history from '../../services/history';

import Banner from './Banner';
import DatePicker from './DatePicker';
import { Container, Loading } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('Banner é obrigátorio'),
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatório'),
  date: Yup.date().required('Data é obrigatório'),
  location: Yup.string().required('Local é obrigatório'),
});

export default function Meetup({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup(meetupId) {
      setLoading(true);

      try {
        const response = await api.get(`meetup/${meetupId}`);

        setMeetup({
          ...response.data,
          date: parse(response.data.date),
        });
      } catch (err) {
        toast.error(err.response);
      }

      setLoading(false);
    }

    if (id) {
      loadMeetup(id);
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        await api.put(`meetup/${id}`, {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          banner_id: data.banner_id,
        });

        toast.success('Meetup alterada com sucesso!');

        history.goBack();
      } catch (err) {
        toast.error(
          err.response.data ? err.response.data.error : 'Connection error.',
        );
      }
    } else {
      try {
        await api.post('/meetup', {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          banner_id: data.banner_id,
        });

        toast.success('Meetup criado com sucesso!');

        history.goBack();
      } catch (err) {
        toast.error(
          err.response.data ? err.response.data.error : 'Connection error.',
        );
      }
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading>
          <Loader type="TailSpin" color="#fff" width={40} height={40} />
        </Loading>
      ) : (
        <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
          <Banner name="banner_id" />
          <Input name="title" placeholder="Título do Meetup" />
          <Input
            type="text"
            name="description"
            placeholder="Descrição completa"
            rows="10"
            multiline
          />

          <DatePicker name="date" placeholder="Date" />
          <Input name="location" placeholder="Localização" />

          <button type="submit">
            <MdAddCircleOutline color="#fff" size={18} />
            Salvar Meetup
          </button>
        </Form>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
