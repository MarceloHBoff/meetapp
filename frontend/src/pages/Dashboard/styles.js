import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #fff;
    }

    button {
      display: flex;
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
  }
`;

export const Meetups = styled.div`
  margin-top: 30px;
`;

export const Meetup = styled.div`
  margin: 10px 0;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${darken(0.12, '#402845')};
  opacity: 0.7;
  color: #fff;

  div {
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 12px;
    }
  }
`;
