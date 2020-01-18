import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Logo({ style }) {
  return <Container style={style}>M</Container>;
}

Logo.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Logo.defaultProps = {
  style: [],
};
