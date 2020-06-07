import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      height: 50px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 15px 20px;
      margin-bottom: 10px;
      background: ${darken(0.04, '#22202c')};
    }

    hr {
      border-color: #999;
      margin: 10px 0;
    }

    button {
      height: 40px;
      display: flex;
      margin-left: auto;
      align-items: center;
      max-width: 130px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      padding: 8px;
      background: #f94d6a;

      &:hover {
        background: ${darken(0.2, '#f94d6a')};
      }

      svg {
        margin-right: 10px;
      }
    }

    span {
      color: rgba(255, 0, 0);
      font-weight: bold;
      margin: 10px;
    }
  }
`;
