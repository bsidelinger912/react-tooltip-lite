import React from 'react';
import { render } from 'react-testing-library';

import Tooltip from '../index';

describe('Tooltip', () => {
  it('should render', () => {
    const { findByText } = render(
      <Tooltip content="Tip content">
        Hello world
      </Tooltip>
    );

    findByText('Hello World');
  });
});
