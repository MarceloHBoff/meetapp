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

    input,
    textarea {
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 10px 15px;
      margin-bottom: 10px;
      background: ${darken(0.04, '#22202c')};
    }

    .react-datepicker-wrapper {
      .react-datepicker__input-container {
        display: flex;
        input {
          flex-grow: 1;
        }
      }
    }

    > span {
      color: rgba(255, 0, 0);
      font-weight: bold;
      margin-bottom: 10px;
    }

    > button {
      display: flex;
      align-items: center;
      margin-left: auto;
      max-width: 150px;
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
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
