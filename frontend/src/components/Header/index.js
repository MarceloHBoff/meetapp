import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const { name } = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>

        <aside>
          <Profile>
            <div>
              <strong>{name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>

            <button type="button" onClick={handleSignOut}>
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
