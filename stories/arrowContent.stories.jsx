import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';
import Wrapper from './Wrapper';

import './arrowContent.css';

storiesOf('Tooltip', module)
  .add('Custom arrow content', () => {
    const isOpen = select('isOpen', isOpenOptions, true);
    const svgArrow = (
      <svg style={{ display: 'block' }} viewBox="0 0 21 11" width="20px" height="10px">
        <path
          d="M0,11 L9.43630703,1.0733987 L9.43630703,1.0733987 C10.1266203,0.3284971 11.2459708,0 11.936284,1.0733987 L20,11"
          style={{ stroke: 'gray', fill: 'white' }}
        />
      </svg>
    );


    return (
      <React.StrictMode>
        <Wrapper flex>
          <Tooltip
            content="By default the text is above the element"
            isOpen={isOpen}
            className="target"
            background="white"
            color="black"
            tipContentClassName="border-tooltip"
            spacing={0}
            arrowContent={svgArrow}
          >
            Hover
          </Tooltip>
          <Tooltip
            content="It'll center if it has room"
            isOpen={isOpen}
            className="target"
            background="white"
            color="black"
            tipContentClassName="border-tooltip"
            spacing={0}
            arrowContent={svgArrow}
          >
            Centered
          </Tooltip>
          <Tooltip
            content="down"
            direction="down"
            isOpen={isOpen}
            className="target"
            background="white"
            color="black"
            tipContentClassName="border-tooltip"
            spacing={0}
            arrowContent={svgArrow}
          >
            Target is here
          </Tooltip>
          <Tooltip
            content="right"
            direction="right"
            isOpen={isOpen}
            className="target"
            background="white"
            color="black"
            tipContentClassName="border-tooltip"
            spacing={0}
            arrowContent={svgArrow}
          >
            Target is here
          </Tooltip>
          <Tooltip
            content="left"
            direction="left"
            isOpen={isOpen}
            className="target"
            background="white"
            color="black"
            tipContentClassName="border-tooltip"
            spacing={0}
            arrowContent={svgArrow}
          >
            Target is here
          </Tooltip>
        </Wrapper>
      </React.StrictMode>
    );
  });
