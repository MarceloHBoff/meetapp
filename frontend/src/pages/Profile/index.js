import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field.required().min(6, 'Necessário pelo menos 6 caracteres')
      : field
  ),
  confirmPassword: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field.required().min(6, 'Necessário pelo menos 6 caracteres')
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação da nova senha"
        />
        <button type="submit">
          <MdAddCircleOutline color="#fff" size={18} />
          Salvar Perfil
        </button>
      </Form>
    </Container>
  );
}
