import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Tooltip from '../src/index';
import { isOpenOptions } from './shared';

import './stories.css';

storiesOf('Tooltip', module)
  .add('Image target', () => {
    const isOpen = select('isOpen', isOpenOptions, true);

    return (
      <div>hi</div>
    );
  });
