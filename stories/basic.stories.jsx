import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Tooltip from '../src/index';

import './stories.css';

storiesOf('Tooltip', module)
  .add('Basic usage', () => {
    const isOpen = boolean('isOpen', undefined);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 100 }}>
        <Tooltip content="By default the text is above the element" isOpen={isOpen}>
          Hover
        </Tooltip>
        <Tooltip content="It'll center if it has room" isOpen={isOpen}>
          Centered
        </Tooltip>
        <Tooltip content="you can specify 'direction' (up, down, left, right) too" direction="down" isOpen={isOpen}>
          Target is here
        </Tooltip>
      </div>
    );
  });
