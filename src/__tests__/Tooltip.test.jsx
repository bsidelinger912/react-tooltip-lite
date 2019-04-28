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

  it('should render and open with hover', () => {
    const { getByText } = render(
      <Tooltip content={tipContent}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    getByText(tipContent);
  });

  it('should handle controlled state', () => {
    const { getByText, rerender, queryByText } = render(
      <Tooltip content={tipContent} isOpen={false}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    expect(queryByText(tipContent)).toBeNull();

    rerender(
      <Tooltip content={tipContent} isOpen>
        {targetContent}
      </Tooltip>
    );

    getByText(tipContent);
  });

  it('should handle null as undefined for isOpen prop', () => {
    const { getByText } = render(
      <Tooltip content={tipContent} isOpen={null}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    getByText(tipContent);
  });
});
