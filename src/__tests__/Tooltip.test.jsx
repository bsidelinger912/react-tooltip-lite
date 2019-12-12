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

  function assertTipHidden(getByText) {
    expect(getByText(tipContent).style.transform).toEqual('translateX(-10000000px)');
  }

  function assertTipVisible(getByText) {
    expect(getByText(tipContent).style.transform).toBeFalsy();
  }

  it('should render and open with hover', () => {
    const { getByText } = render(
      <Tooltip content={tipContent}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    assertTipVisible(getByText);
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

    assertTipVisible(getByText);
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

    assertTipVisible(getByText);
  });

  it('should handle eventOn prop and use mouseout', () => {
    const { getByText } = render(
      <Tooltip content={tipContent} eventOn="onClick">
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.click(target);
    jest.runAllTimers();

    assertTipVisible(getByText);

    fireEvent.mouseOut(target);
    jest.runAllTimers();

    assertTipHidden(getByText);
  });

  it('should handle eventOff prop and use mouseover', () => {
    const { getByText } = render(
      <Tooltip content={tipContent} eventOff="onClick">
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    assertTipVisible(getByText);

    fireEvent.click(target);
    jest.runAllTimers();

    assertTipHidden(getByText);
  });

  it('should handle eventToggle prop', () => {
    const { getByText, queryByText } = render(
      <Tooltip content={tipContent} eventToggle="onClick">
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);

    fireEvent.mouseOver(target);
    jest.runAllTimers();

    expect(queryByText(tipContent)).toBeNull();

    fireEvent.click(target);
    jest.runAllTimers();

    assertTipVisible(getByText);

    fireEvent.click(target);
    jest.runAllTimers();

    assertTipHidden(getByText);
  });

  it('should use hoverDelay prop', () => {
    const hoverDelay = 1000;
    const { getByText, queryByText, rerender } = render(
      <Tooltip content={tipContent} hoverDelay={hoverDelay}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);
    fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();

    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    // hoverDelay is not used on mouseout for tips without the tipContentHoverProp prop
    fireEvent.mouseOut(target);
    assertTipHidden(getByText);

    // with the tipContentHoverProp hoverDelay should be used with mouseOut
    rerender(
      <Tooltip content={tipContent} hoverDelay={hoverDelay} tipContentHover>
        {targetContent}
      </Tooltip>
    );

    fireEvent.mouseOver(target);
    assertTipHidden(getByText);

    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    fireEvent.mouseOut(target);
    assertTipVisible(getByText);

    jest.advanceTimersByTime(hoverDelay);
    assertTipHidden(getByText);
  });

  it('should use mouseOutDelay prop', () => {
    const hoverDelay = 500;
    const mouseOutDelay = 1000;

    const { getByText, queryByText } = render(
      <Tooltip content={tipContent} hoverDelay={hoverDelay} mouseOutDelay={mouseOutDelay}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);
    fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();

    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    fireEvent.mouseOut(target);
    assertTipVisible(getByText);

    jest.advanceTimersByTime(mouseOutDelay);
    assertTipHidden(getByText);
  });

  it('should support onToggle prop', () => {
    const spy = jest.fn();
    const { getByText } = render(
      <Tooltip content={tipContent} onToggle={spy}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);
    fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith(true);

    fireEvent.mouseOut(target);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should support zIndex prop', () => {
    const { getByText } = render(
      <Tooltip content={tipContent} zIndex={5000}>
        {targetContent}
      </Tooltip>
    );

    const target = getByText(targetContent);
    fireEvent.mouseOver(target);

    jest.runAllTimers();

    const tip = getByText(tipContent);
    const styles = window.getComputedStyle(tip);
    expect(styles['z-index']).toEqual('5000');
  });
});
