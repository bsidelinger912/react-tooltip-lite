import React from 'react';
import PropTypes from 'prop-types';

import './Wrapper.css';

const Wrapper = ({ children, extraStyles, flex }) => {
  const styles = {
    ...extraStyles,
    marginTop: 100,
    position: 'relative',
  };

  if (flex) {
    styles.display = 'flex';
    styles.justifyContent = 'space-between';
  }

  return (
    <div style={styles}>{children}</div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  extraStyles: PropTypes.object,
  flex: PropTypes.bool,
};

Wrapper.defaultProps = {
  extraStyles: undefined,
  flex: false,
};

export default Wrapper;
