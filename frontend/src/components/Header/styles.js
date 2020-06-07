import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: ${darken(0.04, '#22202c')};

  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  max-width: 900px;
  padding: 10px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
    height: 40px;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    text-align: right;
    margin-right: 30px;
  }

  strong {
    color: #fff;
    display: block;
    font-size: 12px;
    margin-bottom: 5px;
  }

  a {
    display: block;
    font-size: 10px;
    color: #ccc;
  }

  button {
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    padding: 5px 15px;
    background: #f94d6a;

    &:hover {
      background: ${darken(0.2, '#f94d6a')};
    }
  }
`;
