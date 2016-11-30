/**
 * @file positions.js
 * @description some functions for position calculation
 */

// @TODO: make these options *********
const distance = 10;
const bodyPadding = 10;


function checkLeftRightWidthSufficient(tip, target) {
  const targetRect = target.getBoundingClientRect();
  const deadSpace = Math.min(targetRect.left, window.innerWidth - targetRect.right);

  return (tip.offsetWidth + target.offsetWidth + distance + bodyPadding + deadSpace < window.innerWidth);
}

/**
 * Checks the intended tip direction and falls back if no space
 */
function getDirection(currentDirection, tip, target) {
  // can't switch until target is rendered
  if (!target) {
    return currentDirection;
  }

  const targetRect = target.getBoundingClientRect();

  switch (currentDirection) {
    case 'right':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target)) {
        return getDirection('up', tip, target);
      }

      if (window.innerWidth - targetRect.right < tip.offsetWidth + distance + bodyPadding) {
        return 'left';
      }

      return 'right';

    case 'left':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target)) {
        return getDirection('up', tip, target);
      }

      if (targetRect.left < tip.offsetWidth + distance + bodyPadding) {
        return 'right';
      }

      return 'left';

    case 'up':
      if (targetRect.top < tip.offsetHeight + distance + bodyPadding) {
        return 'down';
      }

      return 'up';

    case 'down':
    default:
      if ((window.innerHeight - targetRect.bottom) < tip.offsetHeight + distance + bodyPadding) {
        return 'up';
      }

      return 'down';
  }
}


/**
 * Sets tip width safely for mobile
 */
function getTipWidth(tip) {
  if (!tip) {
    return null;
  }

  if (tip.offsetWidth > window.innerWidth) {
    return window.innerWidth - (bodyPadding * 2);
  }

  return tip.offsetWidth;
}


/**
 * Gets left position for top/bottom tooltips as well as needed width restriction
 */
function getLeftPosition(tip, target) {
  const targetRect = target.getBoundingClientRect();
  const halfTargetWidth = Math.round(target.offsetWidth / 2);
  const tipWidth = getTipWidth(tip);

  let left = Math.round(tipWidth / 2);

  // set to left of element if has left overhang
  if (targetRect.left + halfTargetWidth < left) {
    left = halfTargetWidth;
  }

  // ***** check right
  const targetRight = window.innerWidth - targetRect.right;
  const fromLeftToWindowRight = left + halfTargetWidth + targetRight;

  if (fromLeftToWindowRight < tipWidth) {
    const rightOverlap = (tipWidth - fromLeftToWindowRight) + bodyPadding;
    left += rightOverlap;
  }

  return left;
}


/**
 * Returns the positions style rules
 */
export function positions(direction, tip, target, state) {
  let left;

  const tipWidth = getTipWidth(tip);

  let maxWidth = '';
  if (tipWidth && tipWidth !== tip.offsetWidth && state.showTip) {
    maxWidth = `${tipWidth - 20}px`;
  }

  // set the wrapper width to match the tip width to avoid squishing
  const width = (tip) ? `${getTipWidth(tip) + (distance * 2)}px` : '10000000px';

  const realDirection = getDirection(direction, tip, target);

  switch (realDirection) {
    case 'right':
      return {
        tipWrapper: {
          left: '100%',
          top: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          top: (state.showTip && tip) ? `-${Math.round(tip.offsetHeight / 2)}px` : '-10000000px',
          left: `${distance}px`,
        },
        arrow: {
          top: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          right: '-11px',
          borderRight: '10px solid black',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
        },
      };

    case 'left':
      return {
        tipWrapper: {
          right: '100%',
          top: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          top: (state.showTip && tip) ? `-${Math.round(tip.offsetHeight / 2)}px` : '-10000000px',
          left: `${distance}px`,
        },
        arrow: {
          top: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          left: '-12px',
          borderLeft: '10px solid black',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
        },
      };

    case 'up':
      if (target) {
        left = getLeftPosition(tip, target);
      }

      return {
        tipWrapper: {
          bottom: '100%',
          left: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          bottom: `${distance}px`,
          left: (state.showTip && tip) ? `-${left}px` : '-10000000px',
          maxWidth,
        },
        arrow: {
          left: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          top: '-11px',
          borderTop: '10px solid black',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
        },
      };

    case 'down':
    default:
      if (target) {
        left = getLeftPosition(tip, target);
      }

      return {
        tipWrapper: {
          top: '100%',
          left: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          top: `${distance}px`,
          left: (state.showTip && tip) ? `-${left}px` : '-10000000px',
          maxWidth,
        },
        arrow: {
          left: (state.showTip && tip) ? 'calc(50% - 10px)' : '-10000000px',
          bottom: '-11px',
          borderBottom: '10px solid black',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
        },
      };
  }
}
