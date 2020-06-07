import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const Logout = styled(Button)`
  margin-top: 15px;
  background: #f64c75;
`;

export const Error = styled.Text`
  color: #ff2222;
  align-items: center;
  align-self: center;
  font-size: 14px;
  margin-bottom: 5px;
`;
