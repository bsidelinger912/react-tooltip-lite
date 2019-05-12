import React from 'react';
import { storiesOf } from '@storybook/react';

import Tooltip from '../src/index';
import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Custom Events', () => (
    <Wrapper>
      <p>
        <Tooltip
          content="this uses hover but also closes on click"
          className="target"
          tipContentClassName=""
          tagName="span"
          eventOff="onClick"
        >
          Close on click
        </Tooltip>
      </p>

      <p>
        <Tooltip
          content="opens on a click and closes on mouse out"
          className="target"
          tipContentClassName=""
          tagName="span"
          eventOn="onClick"
          eventOff="onMouseOut"
          useHover={false}
        >
          Open on click
        </Tooltip>
      </p>

      <p>
        <Tooltip
          content="this uses hover but also closes on click"
          className="target"
          tipContentClassName=""
          tagName="span"
          eventToggle="onClick"
        >
          Toggle on click
        </Tooltip>
      </p>
    </Wrapper>
  ));
