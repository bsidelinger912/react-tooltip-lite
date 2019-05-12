import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';

import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Compound alignment', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <>
        <Wrapper flex>
          <div className="stacked-examples">
            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="right-start"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              right-start
            </Tooltip>

            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="right-end"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              right-end
            </Tooltip>
          </div>

          <div className="stacked-examples">
            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="left-start"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              left-start
            </Tooltip>

            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="left-end"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              left-end
            </Tooltip>
          </div>

        </Wrapper>

        <Wrapper flex>
          <div className="stacked-examples">
            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="up-start"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              top-start
            </Tooltip>

            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="down-start"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              down-start
            </Tooltip>
          </div>
          <div className="stacked-examples">
            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="up-end"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              top-end
            </Tooltip>

            <Tooltip
              isOpen={isOpen}
              content="you can have compound alignments"
              direction="down-end"
              className="target"
              tipContentClassName=""
              arrow={false}
            >
              down-end
            </Tooltip>
          </div>
        </Wrapper>
      </>
    );
  });
