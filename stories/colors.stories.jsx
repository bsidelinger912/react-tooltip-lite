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

        <h3>Default Styles</h3>
        <p>
          pass the
          {'"defaultStyles"'}
          prop as true to get up and running quick and easy
        </p>
        <p>
          <Tooltip
            content="styled with defaults"
            className="target"
            tipContentClassName=""
            useDefaultStyles
            tagName="span"
            isOpen={isOpen}
          >
            See default styles
          </Tooltip>
        </p>
      </Wrapper>
    );
  });
