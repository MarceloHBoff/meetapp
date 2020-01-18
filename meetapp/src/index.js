import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import App from './App';
import { store, persistor } from './store';
import Background from './components/Background';

export default function src() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Background>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </Background>
      </PersistGate>
    </Provider>
  );
}
