import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Tooltip from '../src/index';

import './stories.css';

storiesOf('Tooltip', module)
  .add('In a Paragraph', () => {
    const isOpen = boolean('isOpen', undefined);

    return (
      <p style={{ marginTop: 100 }}>
        For&nbsp;
        <Tooltip content="Go to google" direction="right" tagName="span" isOpen={isOpen}>
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">inline text</a>
        </Tooltip>
        , a right or left tip works nicely. The tip will try to go the desired way and flip if there is not
        enough&nbsp;
        <Tooltip content="Go to google" direction="right" tagName="span" distance={20}>
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">space</a>
        </Tooltip>
        . Shrink the window and see how the tip behaves when close to the
        <Tooltip content="Go to google" direction="right" tagName="span">
          <a href="http://google.com" target="_blank" rel="noopener noreferrer"> edge</a>
        </Tooltip>
        . You can also force the direction of the tip and it will allow itself&nbsp;
        <Tooltip className="target" tipContentClassName="" content="this direction is forced" direction="right" tagName="span" forceDirection>
          to go off screen
        </Tooltip>
        .
      </p>
    );
  });
