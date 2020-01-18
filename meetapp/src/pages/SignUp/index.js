import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import { signUpRequest } from '~/store/modules/auth/actions';
import Logo from '~/components/Logo';

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <Logo />
      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu nome"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu email"
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Cadastrar
        </SubmitButton>
      </Form>
      <SignLink onPress={() => navigation.navigate('SignIn')}>
        <SignLinkText>Ja tenho conta</SignLinkText>
      </SignLink>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
