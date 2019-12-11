/* eslint-disable comma-dangle */

import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import Tooltip from '../index';

jest.useFakeTimers();

describe('Tooltip', () => {
  afterEach(() => {
    cleanup();
  });

  const targetContent = 'Hello world';
  const tipContent = 'Tip content';
  const nonTipContent = 'not part of the tooltip';

  function assertTipHidden(getByText) {
    expect(getByText(tipContent).style.transform).toEqual('translateX(-10000000px)');
  }

  function assertTipVisible(getByText) {
    expect(getByText(tipContent).style.transform).toBeFalsy();
  }

  it('should close tip on any tab outside the tips content area', () => {
    const { getByText } = render(
      <div>
        <div>{nonTipContent}</div>

        <Tooltip content={tipContent}>
          {targetContent}
        </Tooltip>
      </div>
    );

    const target = getByText(targetContent);

    fireEvent.touchStart(target);
    fireEvent.touchEnd(target);
    jest.runAllTimers();

    assertTipVisible(getByText);

    const nonTipDiv = getByText(nonTipContent);
    fireEvent.touchStart(nonTipDiv);
    jest.runAllTimers();

    assertTipHidden(getByText);
  });
});
