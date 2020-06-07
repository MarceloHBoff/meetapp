import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import Background from '../Background';

export default function Container({ children }) {
  return (
    <Background>
      <SafeAreaView>{children}</SafeAreaView>
    </Background>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
