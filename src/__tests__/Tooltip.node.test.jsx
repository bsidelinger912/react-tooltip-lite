/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';

import Tooltip from '../index';

describe('Node env', () => {
  const targetContent = 'Hello world';
  const tipContent = 'Tip content';

  it('doesnt blow up for ssr', () => {
    const string = renderToString(
      <Tooltip content={tipContent} isOpen>
        {targetContent}
      </Tooltip>,
    );

    expect(string).toContain(targetContent);
    expect(string).not.toContain(tipContent);
  });
});
