/**
 * @file positions.js
 * @description some functions for position calculation
 */

import getDirection from './getDirection';

// @TODO: consider which of these should be props that can be passed
const distance = 10;
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
  return document.documentElement.clientWidth - (bodyPadding * 2);
}


/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction) {
  let left = -10000000;
  let top;

  if (tip && state.showTip) {
    // get wrapper left position
    const targetRect = target.getBoundingClientRect();
    const targetLeft = targetRect.left + getScrollLeft();

    const halfTargetWidth = Math.round(target.offsetWidth / 2);
    const tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);

    // default is centered, but must be higher than body padding
    left = Math.max((targetLeft + halfTargetWidth) - Math.round(tipWidth / 2), bodyPadding + getScrollLeft());

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
function getLeftRightPosition(tip, target, state, direction) {
  let left = -10000000;
  let top = 0;

  if (tip && state.showTip) {
    const scrollTop = getScrollTop();
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + scrollTop;
    const halfTargetHeight = Math.round(target.offsetHeight / 2);

    // default to middle, but don't go below body
    top = Math.max((targetTop + halfTargetHeight) - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop);

    // make sure it doesn't go below the arrow
    const arrowTop = (targetTop + halfTargetHeight) - arrowSize;
    top = Math.min(top, arrowTop - minArrowPadding);

    // check for bottom overhang
    const bottomOverhang = ((top - scrollTop) + tip.offsetHeight + bodyPadding) - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      const arrowBottom = targetRect.top + scrollTop + halfTargetHeight + arrowSize;
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
 * Returns the positions style rules
 */
export default function positions(direction, tip, target, state, props) {
  const realDirection = getDirection(direction, tip, target, distance, bodyPadding);
  const maxWidth = getTipMaxWidth();

  switch (realDirection) {
    case 'right':
      return {
        tip: {
          ...getLeftRightPosition(tip, target, state, 'right'),
          maxWidth,
        },
        arrow: {
          top: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          right: '-11px',
          borderRight: (props.background !== '') ? `10px solid ${props.background}` : '',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
        },
        realDirection,
      };

    case 'left':
      return {
        tip: {
          ...getLeftRightPosition(tip, target, state, 'left'),
          maxWidth,
        },
        arrow: {
          top: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          left: '-12px',
          borderLeft: (props.background !== '') ? `10px solid ${props.background}` : '',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
        },
        realDirection,
      };

    case 'up':

      return {
        tip: {
          ...getUpDownPosition(tip, target, state, 'up'),
          maxWidth,
        },
        arrow: {
          left: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          top: '-11px',
          borderTop: (props.background !== '') ? `10px solid ${props.background}` : '',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
        },
        realDirection,
      };

    case 'down':
    default:

      return {
        tip: {
          ...getUpDownPosition(tip, target, state, 'down'),
          maxWidth,
        },
        arrow: {
          left: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          bottom: '-11px',
          borderBottom: (props.background !== '') ? `10px solid ${props.background}` : '',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
        },
        realDirection,
      };
  }
}
