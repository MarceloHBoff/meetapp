import styled from 'styled-components/native';
import { darken } from 'polished';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  background: ${darken(0.04, '#22202c')};
  width: 100%;
`;

export const SubscriptionsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Subscription = styled.View`
  margin-bottom: 30px;
`;

export const Banner = styled.Image`
  flex: 1;
  width: 100%;
  height: 200px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background: #fff;
`;

export const Info = styled.View`
  flex: 1;
  padding: 20px;
  background: #fff;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Date = styled.View`
  flex-direction: row;
`;

export const DateText = styled.Text`
  margin-left: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

export const Location = styled.View`
  flex-direction: row;
`;

export const LocationText = styled.Text`
  margin-left: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

export const Organizer = styled.View`
  flex-direction: row;
`;

export const OrganizerText = styled.Text`
  margin-left: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

export const Cancel = styled(Button)``;

export const Empty = styled.Text`
  text-align: center;
  font-size: 25px;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px;
`;
