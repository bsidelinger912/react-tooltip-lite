import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';
import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Colors', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <Wrapper>
        You can pass&nbsp;
        <Tooltip
          tagName="span"
          className="target"
          tipContentClassName=""
          color="blue"
          background="red"
          content="The color for this is defined by props"
          isOpen={isOpen}
        >
          color options as props
        </Tooltip>
        &nbsp;or use a&nbsp;
        <Tooltip
          tagName="span"
          className="target"
          tipContentClassName="customTip"
          direction="right"
          content="The color for this tip is defined by examples/index.css"
          isOpen={isOpen}
        >
          css stylesheet.
        </Tooltip>
      </Wrapper>
    );
  });
