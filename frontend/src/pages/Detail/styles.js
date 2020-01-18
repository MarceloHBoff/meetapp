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

    div {
      display: flex;
      align-items: center;
    }
  }
`;

export const ButtonDelete = styled.button`
  display: flex;
  align-items: center;
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
`;

export const ButtonEdit = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  padding: 8px;
  background: #4dbaf9;
  margin-right: 15px;

  &:hover {
    background: ${darken(0.2, '#4DBAF9')};
  }

  svg {
    margin-right: 10px;
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  img {
    height: 300px;
    border-radius: 4px;
    border: 1px solid #d44059;
    object-fit: cover;
  }

  p {
    color: #fff;
    margin: 20px 0;
  }
`;

export const Information = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    color: #fff;
    opacity: 0.7;
    font-size: 12px;

    span {
      margin-right: 20px;
    }

    svg {
      margin-right: 8px;
    }
  }
`;
