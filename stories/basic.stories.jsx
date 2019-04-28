import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';

import './stories.css';

storiesOf('Tooltip', module)
  .add('Basic usage', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 100 }}>
        <Tooltip
          content="By default the text is above the element"
          isOpen={isOpen}
          className="target"
          tipContentClassName=""
        >
          Hover
        </Tooltip>
        <Tooltip
          content="It'll center if it has room"
          isOpen={isOpen}
          className="target"
          tipContentClassName=""
        >
          Centered
        </Tooltip>
        <Tooltip
          content="you can specify 'direction' (up, down, left, right) too"
          direction="down"
          isOpen={isOpen}
          className="target"
          tipContentClassName=""
        >
          Target is here
        </Tooltip>
      </div>
    );
  });
