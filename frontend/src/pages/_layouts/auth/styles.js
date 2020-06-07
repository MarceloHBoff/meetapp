import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c, #402845);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }

  img {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    text-align: center;
    flex-direction: column;

    input {
      height: 50px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 15px 20px;
      margin-bottom: 10px;
      background: ${darken(0.04, '#22202c')};
    }

    button {
      height: 50px;
      border: 0;
      margin-top: 15px;
      border-radius: 4px;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      padding: 10px 15px;
      background: #f94d6a;

      &:hover {
        background: ${darken(0.2, '#f94d6a')};
      }
    }

    a {
      margin-top: 15px;
      color: #fff;
      font-size: 16px;
    }

    span {
      color: rgba(255, 0, 0);
      font-weight: bold;
      margin: 10px;
    }
  }
`;
