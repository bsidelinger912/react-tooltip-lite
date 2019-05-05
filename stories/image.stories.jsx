import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';
import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Wrap an image', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <Wrapper>
        <Tooltip
          content="you can wrap images of course too"
          styles={{ display: 'inline-block' }}
          direction="up"
          isOpen={isOpen}
        >
          <img style={{ width: 200, height: 200 }} src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react logo" />
        </Tooltip>

        <Tooltip
          content="this image is absolute positioned"
          styles={{ display: 'inline-block', position: 'absolute', top: '0', right: 0 }}
          direction="right"
          className="image2"
          isOpen={isOpen}
        >
          <img style={{ width: 200, height: 200 }} src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react logo" />
        </Tooltip>
      </Wrapper>
    );
  });
