import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children, extraStyles }) => (
  <div style={{ ...extraStyles, marginTop: 100, position: 'relative' }}>{children}</div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  extraStyles: PropTypes.object,
};

Wrapper.defaultProps = {
  extraStyles: undefined,
};

export default Wrapper;
