/**
 * @file positions.js
 * @description some functions for position calculation
 */

import getDirection from './getDirection';

const bodyPadding = 10;
const minArrowPadding = 5;
export const arrowSize = 10;
const noArrowDistance = 3;

/**
 * cross browser scroll positions
 */
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getScrollLeft() {
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

  const defaultArrowSpacing = props.arrow ? arrowSize : noArrowDistance;
  const arrowSpacing = typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;

  if (tip && state.showTip) {
    // get wrapper left position
    const scrollLeft = getScrollLeft();
    const targetRect = target.getBoundingClientRect();
    const targetLeft = targetRect.left + scrollLeft;

    const halfTargetWidth = Math.round(target.offsetWidth / 2);
    const tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);
    const arrowCenter = targetLeft + halfTargetWidth;
    const arrowLeft = arrowCenter - arrowSize;
    const arrowRight = arrowCenter + arrowSize;

    if (alignMode === 'start') {
      left = props.arrow ? Math.min(arrowLeft, targetLeft) : targetLeft;
    } else if (alignMode === 'end') {
      const rightWithArrow = Math.max(arrowRight, (targetLeft + target.offsetWidth));
      const rightEdge = props.arrow ? rightWithArrow : (targetLeft + target.offsetWidth);
      left = Math.max(rightEdge - tipWidth, bodyPadding + scrollLeft);
    } else {
      const centeredLeft = (targetLeft + halfTargetWidth) - Math.round(tipWidth / 2);
      const whyThis = bodyPadding + scrollLeft;

      left = Math.max(centeredLeft, whyThis);
    }

    // check for right overhang
    const rightOfTip = left + tipWidth;
    const rightOfScreen = (scrollLeft + document.documentElement.clientWidth) - bodyPadding;
    const rightOverhang = rightOfTip - rightOfScreen;
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

  const defaultArrowSpacing = props.arrow ? arrowSize : noArrowDistance;
  const arrowSpacing = typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;
  const arrowPadding = props.arrow ? minArrowPadding : 0;

  if (tip && state.showTip) {
    const scrollTop = getScrollTop();
    const scrollLeft = getScrollLeft();
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + scrollTop;
    const halfTargetHeight = Math.round(target.offsetHeight / 2);
    const arrowTop = (targetTop + halfTargetHeight) - arrowSize;
    const arrowBottom = targetRect.top + scrollTop + halfTargetHeight + arrowSize;

    // TODO: handle close to edges better
    if (alignMode === 'start') {
      top = props.arrow ? Math.min(targetTop, arrowTop) : targetTop;
    } else if (alignMode === 'end') {
      const topForBottomAlign = (targetRect.bottom + scrollTop) - tip.offsetHeight;
      top = props.arrow ? Math.max(topForBottomAlign, arrowBottom - tip.offsetHeight) : topForBottomAlign;
    } else {
      // default to middle, but don't go below body
      const centeredTop = Math.max((targetTop + halfTargetHeight) - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop);

      // make sure it doesn't go below the arrow
      top = Math.min(centeredTop, arrowTop + arrowSpacing);
    }

    // check for bottom overhang
    const bottomOverhang = ((top - scrollTop) + tip.offsetHeight + bodyPadding) - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, (arrowBottom + arrowPadding) - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + arrowSpacing + scrollLeft;
    } else {
      left = (targetRect.left - arrowSpacing - tip.offsetWidth) + scrollLeft;
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
  const arrowSpacing = typeof props.distance === 'number' ? props.distance : arrowSize;

  switch (direction) {
    case 'right':
      return {
        top: (state.showTip && tip) ? (targetRect.top + scrollTop + halfTargetHeight) - arrowSize : '-10000000px',
        left: targetRect.right + scrollLeft + arrowSpacing - arrowSize,
        borderRight: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
      };

    case 'left':
      return {
        top: (state.showTip && tip) ? (targetRect.top + scrollTop + halfTargetHeight) - arrowSize : '-10000000px',
        left: (targetRect.left + scrollLeft) - arrowSpacing - 1,
        borderLeft: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
      };

    case 'up':
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: (targetRect.top + scrollTop) - arrowSpacing,
        borderTop: (props.background !== '') ? `${arrowSize}px solid ${props.background}` : '',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
      };

    case 'down':
    default:
      return {
        left: (state.showTip && tip) ? (targetRect.left + scrollLeft + halfTargetWidth) - arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop + arrowSpacing - arrowSize,
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
  const trimmedDirection = direction.split('-')[0];

  let realDirection = trimmedDirection;
  if (tip && state.showTip) {
    const testArrowStyles = getArrowStyles(target, tip, trimmedDirection, state, props);
    realDirection = getDirection(trimmedDirection, tip, target, props.arrow ? arrowSize : 0, bodyPadding, props.arrow && testArrowStyles);
  }

  const maxWidth = getTipMaxWidth();

  // force the tip to display the width we measured everything at when visible, when scrolled
  let width;
  if (tip && state.showTip && getScrollLeft() > 0) {
    // adding the exact width on the first render forces a bogus line break, so add 1px the first time
    const spacer = tip.style.width ? 0 : 1;
    width = Math.min(tip.offsetWidth, maxWidth) + spacer;
  }

  const tipPosition = (realDirection === 'up' || realDirection === 'down')
    ? getUpDownPosition(tip, target, state, realDirection, alignMode, props)
    : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);

  return {
    tip: {
      ...tipPosition,
      maxWidth,
      width,
    },
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection,
  };
}
