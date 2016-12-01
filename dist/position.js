'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = positions;

var _getDirection = require('./getDirection');

var _getDirection2 = _interopRequireDefault(_getDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO: make these options (passed as props) at some point
var distance = 10; /**
                    * @file positions.js
                    * @description some functions for position calculation
                    */

var bodyPadding = 10;
var arrowWidth = 10;

/**
 * Sets tip width safely for mobile
 */
function getTipWidth(tip) {
  if (!tip) {
    return null;
  }

  if (tip.offsetWidth + bodyPadding * 2 > document.documentElement.clientWidth) {
    return document.documentElement.clientWidth - bodyPadding * 2;
  }

  return tip.offsetWidth + 1;
}

/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getWrapperLeft(tip, target) {
  // get wrapper left position
  var targetRect = target.getBoundingClientRect();
  var halfTargetWidth = Math.round(target.offsetWidth / 2);
  var tipWidth = getTipWidth(tip);

  // default is centered
  var left = halfTargetWidth - tipWidth / 2;

  // check for left overhang here
  if (targetRect.left + left < 0) {
    left = (targetRect.left - bodyPadding) * -1;
  }

  // check for right overhang
  var rightOverhang = tipWidth - (document.documentElement.clientWidth - targetRect.left + left * -1);
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
  var top = Math.round(tip.offsetHeight / 2);

  var targetRect = target.getBoundingClientRect();
  var halfTargetHeight = Math.round(target.offsetHeight / 2);

  // check for top overhang
  if (targetRect.top + halfTargetHeight < top) {
    top = Math.max(targetRect.top + halfTargetHeight - bodyPadding, arrowWidth);

    // check for bottom overhang
  } else {
    var targetBottom = window.innerHeight - targetRect.bottom;
    var fromTopToWindowBottom = top + halfTargetHeight + targetBottom;

    if (fromTopToWindowBottom < tip.offsetHeight) {
      var bottomOverlap = tip.offsetHeight - fromTopToWindowBottom + bodyPadding;
      top = Math.min(top + bottomOverlap, tip.offsetHeight - arrowWidth);
    }
  }

  return top;
}

/**
 * Returns the positions style rules
 */
function positions(direction, tip, target, state, props) {
  var realDirection = (0, _getDirection2.default)(direction, tip, target, distance, bodyPadding);

  // set the wrapper width to match the tip width to avoid squishing
  var width = '1000000px';
  if (tip) {
    if (realDirection !== 'up' && realDirection !== 'down') {
      width = getTipWidth(tip) + distance * 2 + 'px';
    } else {
      width = getTipWidth(tip);
    }
  }

  switch (realDirection) {
    case 'right':
      return {
        tipWrapper: {
          left: tip ? '100%' : '-1000000px',
          top: '50%',
          width: width
        },
        tip: {
          position: 'absolute',
          top: state.showTip && tip ? '-' + getTopPosition(tip, target) + 'px' : '-10000000px',
          left: distance + 'px'
        },
        arrow: {
          top: state.showTip && tip ? 'calc(50% - 10px)' : '-10000000px',
          right: '-11px',
          borderRight: props.background !== '' ? '10px solid ' + props.background : '',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent'
        },
        realDirection: realDirection
      };

    case 'left':
      return {
        tipWrapper: {
          right: tip ? '100%' : '1000000px', // ***** ??????? is this right????
          top: '50%',
          width: width
        },
        tip: {
          position: 'absolute',
          top: state.showTip && tip ? '-' + getTopPosition(tip, target) + 'px' : '-10000000px',
          left: distance + 'px'
        },
        arrow: {
          top: state.showTip && tip ? 'calc(50% - 10px)' : '-10000000px',
          left: '-12px',
          borderLeft: props.background !== '' ? '10px solid ' + props.background : '',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent'
        },
        realDirection: realDirection
      };

    case 'up':

      return {
        tipWrapper: {
          bottom: '100%',
          left: tip && state.showTip ? getWrapperLeft(tip, target) : '-10000000px',
          width: width
        },
        tip: {
          position: 'absolute',
          bottom: distance + 'px',
          left: '0'
        },
        arrow: {
          left: state.showTip && tip ? 'calc(50% - 10px)' : '-10000000px',
          top: '-11px',
          borderTop: props.background !== '' ? '10px solid ' + props.background : '',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent'
        },
        realDirection: realDirection
      };

    case 'down':
    default:

      return {
        tipWrapper: {
          top: '100%',
          left: tip && state.showTip ? getWrapperLeft(tip, target) : '-10000000px',
          width: width
        },
        tip: {
          position: 'absolute',
          top: distance + 'px',
          left: '0'
        },
        arrow: {
          left: state.showTip && tip ? 'calc(50% - 10px)' : '-10000000px',
          bottom: '-11px',
          borderBottom: props.background !== '' ? '10px solid ' + props.background : '',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent'
        },
        realDirection: realDirection
      };
  }
}