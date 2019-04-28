import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

registerRequireContextHook();

/* const beforeScreenshot = (page) => {
  return new Promise((resolve) => {
    page.hover('.target')
      .then(() => {
        setTimeout(resolve, 500);
      })
      .catch(() => {
        console.log('no elemet with .target found');
        resolve();
      });
  });
}; */

initStoryshots({
  suite: 'Storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006',
  }),
});
