import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';

import './stories.css';

storiesOf('Tooltip', module)
  .add('In a Paragraph', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <p style={{ marginTop: 100 }}>
        For&nbsp;
        <Tooltip content="Go to google" direction="right" tagName="span" isOpen={isOpen}>
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">inline text</a>
        </Tooltip>
        , a right or left tip works nicely. The tip will try to go the desired way and flip if there is not
        enough&nbsp;
        <Tooltip content="Go to google" direction="right" tagName="span" isOpen={isOpen}>
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">space</a>
        </Tooltip>
        .

        <p style={{ marginTop: 50, marginRight: 100, textAlign: 'right' }}>
          You can also force the direction of the tip and it will allow itself&nbsp;
          <Tooltip className="target" tipContentClassName="" isOpen={isOpen} content="this direction is forced" direction="right" tagName="span" forceDirection>
            to go off screen
          </Tooltip>
          .
        </p>
      </p>
    );
  });
