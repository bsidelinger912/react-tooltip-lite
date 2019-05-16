import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';
import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Nested Targets', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <Wrapper extraProps={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip
          content="Nested Elements"
          isOpen={isOpen}
          tagName="span"
        >
          <button type="button">
            some text&nbsp;
            <span>a span</span>
          </button>
        </Tooltip>
      </Wrapper>
    );
  });
