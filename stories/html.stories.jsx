import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';
import Wrapper from './Wrapper';

storiesOf('Tooltip', module)
  .add('Html content', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <Wrapper>
        <p>
          You can also have a tooltip with&nbsp;
          <Tooltip
            content={(
              <div>
                <h4 className="tip-heading">An unordered list to demo some html content</h4>
                <ul className="tip-list">
                  <li>One</li>
                  <li>Two</li>
                  <li>Three</li>
                  <li>Four</li>
                  <li>Five</li>
                </ul>
              </div>
            )}
            direction="right"
            tagName="span"
            className="target"
            tipContentClassName=""
            isOpen={isOpen}
          >
            Html content
          </Tooltip>
          .
        </p>

        <p style={{ marginTop: 100 }}>
          By specifying the prop &quot;tipContentHover&quot; as true, you can persist hover state when cursor is over the tip.  This allows for links
          in your tip, copying contents and other behaviors.  Here&apos;s an&nbsp;
          <Tooltip
            content={(
              <div>
                You can copy this text, or click this
                <a href="https://www.npmjs.com/package/react-tooltip-lite" target="_blank" rel="noopener noreferrer">link</a>
              </div>
            )}
            tagName="span"
            direction="right"
            className="target"
            tipContentClassName=""
            tipContentHover
            isOpen={isOpen}
          >
            example
          </Tooltip>
          .
        </p>
      </Wrapper>
    );
  });
