import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../stories/stories.css';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.jsx?$/);

addDecorator(withKnobs);

const newViewports = {
  storyshots: {
    name: 'storyshots',
    styles: {
      width: '800px',
      height: '600px',
    },
  },
  responsive: {
    name: 'Responsive',
    styles: {
      width: '100%',
      height: '100%',
    },
    type: 'desktop',
  }
};

addParameters({
  viewport: {
    defaultViewport: 'storyshots',
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...newViewports,
    },
  },
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
