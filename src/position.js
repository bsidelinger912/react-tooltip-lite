/**
 * @file positions.js
 * @description some functions for position calculation
 */

import getDirection from './getDirection';

// @TODO: consider which of these should be props that can be passed
const bodyPadding = 10;
const minArrowPadding = 5;
const arrowSize = 10;

/**
 * cross browser scroll positions
 */
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

/**
 * Sets tip max width safely for mobile
 */
function getTipMaxWidth() {
  return (typeof document !== 'undefined') ? document.documentElement.clientWidth - (bodyPadding * 2) : 1000;
}

/**
 * Parses align mode from direction if specified with hyphen, defaulting to middle if not -
 * e.g. 'left-start' is mode 'start' and 'left' would be the default of 'middle'
 */
function parseAlignMode(direction) {
  const directionArray = direction.split('-');
  if (directionArray.length > 1) {
    return directionArray[1];
  }
  return 'middle';
}

/**
 *  Interpolates a scalar based on possible values of "start", "end" or "middle" (default)
 */
function interpolateAlignOffset(alignMode, value) {
  switch (alignMode) {
    case 'start':
      return 0;
    case 'end':
      return value;
    default:
      return Math.round(value / 2);
  }
}

/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction, distance, alignMode) {
  let left = -10000000;
  let top;

  if (tip && state.showTip) {
    // get wrapper left position
    const targetRect = target.getBoundingClientRect();
    const targetLeft = targetRect.left + getScrollLeft();

    const targetWidth = interpolateAlignOffset(alignMode, target.offsetWidth);
    const tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);

    // default to positioning specifed by offset, but must be higher than body padding
    left = Math.max((targetLeft + targetWidth) - interpolateAlignOffset(alignMode, tipWidth), bodyPadding + getScrollLeft());

    // check for right overhang
    const rightOverhang = (left + tipWidth + bodyPadding) - document.documentElement.clientWidth;
    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = (targetRect.top + getScrollTop()) - (tip.offsetHeight + distance);
    } else {
      top = targetRect.bottom + getScrollTop() + distance;
    }
  }

  return {
    left,
    top,
  };
}


/**
 * gets top position for left/right arrows
 */
function getLeftRightPosition(tip, target, state, direction, distance, alignMode) {
  let left = -10000000;
  let top = 0;

  if (tip && state.showTip) {
    const scrollTop = getScrollTop();
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + scrollTop;
    const targetHeight = interpolateAlignOffset(alignMode, target.offsetHeight);

    // default to positioning specifed by offset, but don't go below body
    top = Math.max((targetTop + targetHeight) - interpolateAlignOffset(alignMode, tip.offsetHeight), bodyPadding + scrollTop);

    // make sure it doesn't go below the arrow
    const arrowTop = (targetTop + targetHeight) - arrowSize;
    top = Math.min(top, arrowTop - minArrowPadding);

    // check for bottom overhang
    const bottomOverhang = ((top - scrollTop) + tip.offsetHeight + bodyPadding) - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      const arrowBottom = targetRect.top + scrollTop + targetHeight + arrowSize;
      top = Math.max(top - bottomOverhang, (arrowBottom + minArrowPadding) - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + distance;
    } else {
      left = targetRect.left - distance - tip.offsetWidth;
    }
  }

  return {
    left,
    top,
  };
}

/**
 * sets the Arrow styles based on direction
 */
function getArrowStyles(target, tip, direction, state, props) {
  if (!target) {
    return {
      top: '0',
      left: '-10000000px',
    };
  }

  const targetRect = target.getBoundingClientRect();
  const halfTargetHeight = Math.round(target.offsetHeight / 2);
  const halfTargetWidth = Math.round(target.offsetWidth / 2);
  const scrollTop = getScrollTop();
  const scrollLeft = getScrollLeft();

  switch (direction) {
    case 'right':
      return {
        top: (state.showTip && tip) ? (targetRect.top + scrollTop + halfTargetHeight) - arrowSize : '-10000000px',
        left: targetRect.right + scrollLeft,
        borderRight: (props.background !== '') ? `10px solid ${props.background}` : '',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
      };

    case 'left':
      return {
        top: (state.showTip && tip) ? (targetRect.top + scrollTop + halfTargetHeight) - arrowSize : '-10000000px',
        left: (targetRect.left + scrollLeft) - props.distance - 1,
        borderLeft: (props.background !== '') ? `10px solid ${props.background}` : '',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
      };

    case 'up':
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: (targetRect.top + scrollTop) - props.distance,
        borderTop: (props.background !== '') ? `10px solid ${props.background}` : '',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
      };

    case 'down':
    default:
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop,
        borderBottom: (props.background !== '') ? `10px solid ${props.background}` : '',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
      };
  }
}

/**
 * Returns the positions style rules
 */
export default function positions(direction, tip, target, state, props) {
  const alignMode = parseAlignMode(direction);
  const realDirection = getDirection(direction, tip, target, props.distance, bodyPadding);
  const maxWidth = getTipMaxWidth();

  const tipPosition = (realDirection === 'up' || realDirection === 'down')
    ? getUpDownPosition(tip, target, state, realDirection, props.distance, alignMode)
    : getLeftRightPosition(tip, target, state, realDirection, props.distance, alignMode);

  return {
    tip: {
      ...tipPosition,
      maxWidth,
    },
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection,
  };
}
