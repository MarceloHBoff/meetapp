import React, { useState, useEffect, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { parseISO, format, addDays, subDays } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';

import Header from '../../components/Header';
import Container from '../../components/Container';

import api from '../../services/api';

import {
  FilterDate,
  Day,
  MeetupsList,
  Meetup,
  Banner,
  Info,
  Title,
  DateMeetup,
  DateText,
  Location,
  LocationText,
  Organizer,
  OrganizerText,
  Subscribe,
  Empty,
} from './styles';

export default function MeetUps() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [pages, setPages] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));

    setPages(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));

    setPages(1);
  }

  async function loadMeetups() {
    const response = await api.get('meetup', {
      params: { date, pages },
    });

    const meets = response.data.map(sub => ({
      ...sub,
      dateFormatted: format(
        parseISO(sub.date),
        "dd 'de' MMMM', às 'HH'h 'mm'min'",
        {
          locale: pt,
        },
      ),
    }));

    setMeetups(pages >= 2 ? [...meetups, ...meets] : meets);
    setRefresh(false);
  }

  useEffect(() => {
    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function loadMore() {
    setPages(pages + 1);

    loadMeetups();
  }

  function refreshing() {
    setRefresh(true);
    setPages(1);

    loadMeetups();
  }

  async function handleSubscribe(id) {
    try {
      await api.post(`/meetup/${id}/subscription`);

      Alert.alert('Inscrição realizada com sucesso!');
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
      <Header />

      <FilterDate>
        <TouchableOpacity onPress={handlePrevDay}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </TouchableOpacity>
        <Day>{dateFormatted}</Day>
        <TouchableOpacity onPress={handleNextDay}>
          <Icon name="chevron-right" size={40} color="#fff" />
        </TouchableOpacity>
      </FilterDate>

      {meetups.length === 0 ? (
        <Empty>Nenhuma Meetup cadastrada para esta data</Empty>
      ) : (
        <MeetupsList
          data={meetups}
          onRefresh={refreshing}
          refreshing={refresh}
          onEndReachedThreshold={0.3}
          onEndReached={loadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup>
              <Banner
                source={{
                  uri: item.File
                    ? item.File.url
                    : `https://api.adorable.io/avatar/100/${item.User.name}.png`,
                }}
              />
              <Info>
                <Title>{item.title}</Title>
                <DateMeetup>
                  <Icon name="event" size={16} color="rgba(0,0,0,0.4)" />
                  <DateText>{item.dateFormatted}</DateText>
                </DateMeetup>
                <Location>
                  <Icon name="room" size={16} color="rgba(0,0,0,0.4)" />
                  <LocationText>{item.location}</LocationText>
                </Location>
                <Organizer>
                  <Icon name="person" size={16} color="rgba(0,0,0,0.4)" />
                  <OrganizerText>{item.User.name}</OrganizerText>
                </Organizer>
                <Subscribe onPress={() => handleSubscribe(item.id)}>
                  Realizar inscrição
                </Subscribe>
              </Info>
            </Meetup>
          )}
        />
      )}
    </Container>
  );
}
