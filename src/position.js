/**
 * @file positions.js
 * @description some functions for position calculation
 */

import getDirection from './getDirection';

// @TODO: make these options (passed as props) at some point
const distance = 10;
const bodyPadding = 10;
const arrowWidth = 10;

/**
 * Sets tip width safely for mobile
 */
function getTipWidth(tip) {
  if (!tip) {
    return null;
  }

  if (tip.offsetWidth + (bodyPadding * 2) > document.documentElement.clientWidth) {
    return document.documentElement.clientWidth - (bodyPadding * 2);
  }


  return tip.offsetWidth + 1;
}


/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getWrapperLeft(tip, target) {
  // get wrapper left position
  const targetRect = target.getBoundingClientRect();
  const halfTargetWidth = Math.round(target.offsetWidth / 2);
  const tipWidth = getTipWidth(tip);

  // default is centered
  let left = halfTargetWidth - (tipWidth / 2);

  // check for left overhang here
  if (targetRect.left + left < 0) {
    left = (targetRect.left - bodyPadding) * -1;
  }

  // check for right overhang
  const rightOverhang = tipWidth - ((document.documentElement.clientWidth - targetRect.left) + (left * -1));
  if (rightOverhang > 0) {
    left -= rightOverhang + bodyPadding;
  }

  return left;
}


/**
 * gets top position for left/right arrows
 */
function getTopPosition(tip, target) {
  // centered by default
  let top = Math.round(tip.offsetHeight / 2);

  const targetRect = target.getBoundingClientRect();
  const halfTargetHeight = Math.round(target.offsetHeight / 2);

  // check for top overhang
  if (targetRect.top + halfTargetHeight < top) {
    top = Math.max((targetRect.top + halfTargetHeight) - bodyPadding, arrowWidth);

  // check for bottom overhang
  } else {
    const targetBottom = window.innerHeight - targetRect.bottom;
    const fromTopToWindowBottom = top + halfTargetHeight + targetBottom;

    if (fromTopToWindowBottom < tip.offsetHeight) {
      const bottomOverlap = (tip.offsetHeight - fromTopToWindowBottom) + bodyPadding;
      top = Math.min(top + bottomOverlap, tip.offsetHeight - arrowWidth);
    }
  }

  return top;
}

/**
 * Returns the positions style rules
 */
export default function positions(direction, tip, target, state, props) {
  const realDirection = getDirection(direction, tip, target, distance, bodyPadding);

  // set the wrapper width to match the tip width to avoid squishing
  let width = '1000000px';
  if (tip) {
    if (realDirection !== 'up' && realDirection !== 'down') {
      width = `${getTipWidth(tip) + (distance * 2)}px`;
    } else {
      width = getTipWidth(tip);
    }
  }

  switch (realDirection) {
    case 'right':
      return {
        tipWrapper: {
          left: (tip) ? '100%' : '-1000000px',
          top: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          top: (state.showTip && tip) ? `-${getTopPosition(tip, target)}px` : '-10000000px',
          left: `${distance}px`,
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
        tipWrapper: {
          right: (tip) ? '100%' : '1000000px', // ***** ??????? is this right????
          top: '50%',
          width,
        },
        tip: {
          position: 'absolute',
          top: (state.showTip && tip) ? `-${getTopPosition(tip, target)}px` : '-10000000px',
          left: `${distance}px`,
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
        tipWrapper: {
          bottom: '100%',
          left: (tip && state.showTip) ? getWrapperLeft(tip, target) : '-10000000px',
          width,
        },
        tip: {
          position: 'absolute',
          bottom: `${distance}px`,
          left: '0',
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
        tipWrapper: {
          top: '100%',
          left: (tip && state.showTip) ? getWrapperLeft(tip, target) : '-10000000px',
          width,
        },
        tip: {
          position: 'absolute',
          top: `${distance}px`,
          left: '0',
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
