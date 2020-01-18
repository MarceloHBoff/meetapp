import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  align-self: stretch;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    width: 600px;
    height: 300px;
    background: ${darken(0.04, '#22202c')};

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 600px;
      height: 300px;
      border-radius: 4px;
      border: 1px solid #d44059;
      object-fit: cover;
    }

    input {
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
      color: #fff;
    }
  }

  > span {
    color: rgba(255, 0, 0);
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
