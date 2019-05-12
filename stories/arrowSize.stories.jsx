import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';

import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Arrow size and distance', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <Wrapper extraStyles={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip
          isOpen={isOpen}
          content="This has an arrowSize of 20"
          className="target"
          tipContentClassName=""
          arrowSize={20}
        >
          Larger arrowSize
        </Tooltip>
        <Tooltip
          isOpen={isOpen}
          direction="down"
          content="This has an arrowSize of 5"
          className="target"
          tipContentClassName=""
          arrowSize={5}
        >
          Smaller arrowSize
        </Tooltip>
        <Tooltip
          isOpen={isOpen}
          content="This has a distance prop of 20"
          className="target"
          tipContentClassName=""
          distance={20}
        >
          Increase distance
        </Tooltip>
        <Tooltip
          isOpen={isOpen}
          direction="down"
          content="This has a distance prop of 0"
          className="target"
          tipContentClassName=""
          distance={0}
        >
          Decrease distance
        </Tooltip>
      </Wrapper>
    );
  });
