import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  SubscriptionsList,
  Subscription,
  Banner,
  Info,
  Title,
  Date,
  DateText,
  Location,
  LocationText,
  Organizer,
  OrganizerText,
  Cancel,
  Empty,
} from './styles';
import Logo from '~/components/Logo';
import api from '~/services/api';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState('');

  async function loadSubscriptions() {
    const response = await api.get('subscription');
    const subs = response.data.map(sub => ({
      ...sub,
      dateFormatted: format(
        parseISO(sub.Meetup.date),
        "dd 'de' MMMM', às 'HH'h 'mm'min'",
        {
          locale: pt,
        }
      ),
    }));

    setSubscriptions(subs);
  }

  useEffect(() => {
    if (isFocused) loadSubscriptions();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscription/${id}`);

      setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (err) {
      if (err.response) {
        Alert.alert(err.response.data.error);
      } else {
        Alert.alert('Connection error.');
      }
    }
  }

  return (
    <Container>
      <Header>
        <Logo style={{ fontSize: 45, padding: 5, alignSelf: 'center' }} />
      </Header>
      {subscriptions.length === 0 ? (
        <Empty>Você não tem nenhuma inscrição</Empty>
      ) : (
        <SubscriptionsList
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Subscription>
              <Banner
                source={{
                  uri: item.Meetup.File
                    ? item.Meetup.File.url
                    : `https://api.adorable.io/avatar/100/${item.Meetup.User.name}.png`,
                }}
              />
              <Info>
                <Title>{item.Meetup.title}</Title>
                <Date>
                  <Icon name="event" size={16} color="rgba(0,0,0,0.4)" />
                  <DateText>{item.dateFormatted}</DateText>
                </Date>
                <Location>
                  <Icon name="room" size={16} color="rgba(0,0,0,0.4)" />
                  <LocationText>{item.Meetup.location}</LocationText>
                </Location>
                <Organizer>
                  <Icon name="person" size={16} color="rgba(0,0,0,0.4)" />
                  <OrganizerText>{item.Meetup.User.name}</OrganizerText>
                </Organizer>
                <Cancel onPress={() => handleCancel(item.id)}>
                  Cancelar inscrição
                </Cancel>
              </Info>
            </Subscription>
          )}
        />
      )}
    </Container>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
