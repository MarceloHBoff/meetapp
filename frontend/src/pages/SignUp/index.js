import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Necessário pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <h1>M</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite seu nome completo" />
        <Input name="email" type="email" placeholder="Digite seu email" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
