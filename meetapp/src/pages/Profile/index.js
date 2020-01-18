import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Header,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  Logout,
} from './styles';

import Logo from '~/components/Logo';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  async function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <Logo style={{ fontSize: 45, padding: 5, alignSelf: 'center' }} />
      </Header>
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
          onSubmitEditing={() => oldPasswordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Separator />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha atual"
          ref={oldPasswordRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua nova senha"
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          value={password}
          onChangeText={setPassword}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Confirmação da nova senha"
          ref={confirmPasswordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
        <Logout onPress={handleLogout}>Sair</Logout>
      </Form>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
