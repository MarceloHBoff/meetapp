import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: ${darken(0.04, '#22202c')};

  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.7)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
