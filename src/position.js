/**
 * @file positions.js
 * @description some functions for position calculation
 */

import getDirection from './getDirection';

const bodyPadding = 10;
const minArrowPadding = 5;
const arrowSize = 10;
const noArrowDistance = 3;

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
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction, alignMode, props) {
  let left = -10000000;
  let top;

  const arrowSpacing = props.arrow ? arrowSize : noArrowDistance;

  if (tip && state.showTip) {
    // get wrapper left position
    const targetRect = target.getBoundingClientRect();
    const targetLeft = targetRect.left + getScrollLeft();

    const halfTargetWidth = Math.round(target.offsetWidth / 2);
    const tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);
    const arrowCenter = targetLeft + halfTargetWidth;
    const arrowLeft = arrowCenter - arrowSize;
    const arrowRight = arrowCenter + arrowSize;

    if (alignMode === 'start') {
      left = props.arrow ? arrowLeft : targetLeft;
    } else if (alignMode === 'end') {
      left = (props.arrow ? arrowRight : (targetLeft + target.offsetWidth)) - tipWidth;
    } else {
      left = Math.max((targetLeft + halfTargetWidth) - Math.round(tipWidth / 2), bodyPadding + getScrollLeft());
    }

    // check for right overhang
    const rightOverhang = (left + tipWidth + bodyPadding) - document.documentElement.clientWidth;
    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = (targetRect.top + getScrollTop()) - (tip.offsetHeight + arrowSpacing);
    } else {
      top = targetRect.bottom + getScrollTop() + arrowSpacing;
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
function getLeftRightPosition(tip, target, state, direction, alignMode, props) {
  let left = -10000000;
  let top = 0;

  const arrowSpacing = props.arrow ? arrowSize : noArrowDistance;
  const arrowPadding = props.arrow ? minArrowPadding : 0;

  if (tip && state.showTip) {
    const scrollTop = getScrollTop();
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + scrollTop;
    const halfTargetHeight = Math.round(target.offsetHeight / 2);
    const arrowTop = (targetTop + halfTargetHeight) - arrowSpacing;
    const arrowBottom = targetRect.top + scrollTop + halfTargetHeight + arrowSpacing;

    // TODO: handle close to edges better
    if (alignMode === 'start') {
      top = props.arrow ? arrowTop : targetTop;
    } else if (alignMode === 'end') {
      top = ((props.arrow ? (arrowTop + arrowSize) : targetRect.bottom) - tip.offsetHeight) + scrollTop;
    } else {
      // default to middle, but don't go below body
      const centeredTop = Math.max((targetTop + halfTargetHeight) - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop);

      // make sure it doesn't go below the arrow
      top = Math.min(centeredTop, arrowTop - arrowPadding);
    }

    // check for bottom overhang
    const bottomOverhang = ((top - scrollTop) + tip.offsetHeight + bodyPadding) - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, (arrowBottom + arrowPadding) - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + arrowSpacing;
    } else {
      left = targetRect.left - arrowSpacing - tip.offsetWidth;
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
  if (!target || !props.arrow) {
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
        borderRight: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
      };

    case 'left':
      return {
        top: (state.showTip && tip) ? (targetRect.top + scrollTop + halfTargetHeight) - arrowSize : '-10000000px',
        left: (targetRect.left + scrollLeft) - arrowSize - 1,
        borderLeft: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
      };

    case 'up':
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: (targetRect.top + scrollTop) - arrowSize,
        borderTop: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
      };

    case 'down':
    default:
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop,
        borderBottom: (props.background !== '') ? `10px solid ${props.background}` : '',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
      };
  }
}

/**
 * Returns the positions style rules
 */
export default function positions(direction, tip, target, state, props) {
  const alignMode = parseAlignMode(direction);
  const realDirection = getDirection(direction, tip, target, props.arrow ? arrowSize : 0, bodyPadding);
  const maxWidth = getTipMaxWidth();

  const tipPosition = (realDirection === 'up' || realDirection === 'down')
    ? getUpDownPosition(tip, target, state, realDirection, alignMode, props)
    : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);

  return {
    tip: {
      ...tipPosition,
      maxWidth,
    },
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection,
  };
}
