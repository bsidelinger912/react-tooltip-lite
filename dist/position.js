'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @file positions.js
                                                                                                                                                                                                                                                                   * @description some functions for position calculation
                                                                                                                                                                                                                                                                   */

exports.default = positions;

var _getDirection = require('./getDirection');

var _getDirection2 = _interopRequireDefault(_getDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO: make these options (passed as props) at some point
var distance = 10;
var bodyPadding = 10;
var minArrowPadding = 5;

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
  return document.documentElement.clientWidth - bodyPadding * 2;
}

/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction) {
  var left = -10000000;
  var top = void 0;

  if (tip && state.showTip) {
    // get wrapper left position
    var targetRect = target.getBoundingClientRect();
    var targetLeft = targetRect.left + getScrollLeft();

    var halfTargetWidth = Math.round(target.offsetWidth / 2);
    var tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);

    // default is centered, but must be higher than body padding
    left = Math.max(targetLeft + halfTargetWidth - Math.round(tipWidth / 2), bodyPadding + getScrollLeft());

    // check for right overhang
    var rightOverhang = left + tipWidth + bodyPadding - document.documentElement.clientWidth;
    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = targetRect.top + getScrollTop() - (tip.offsetHeight + distance);
    } else {
      top = targetRect.bottom + getScrollTop() + distance;
    }
  }

  return {
    left: left,
    top: top
  };
}

/**
 * gets top position for left/right arrows
 */
function getLeftRightPosition(tip, target, state, direction) {
  var left = -10000000;
  var top = 0;

  if (tip && state.showTip) {
    var scrollTop = getScrollTop();
    var targetRect = target.getBoundingClientRect();
    var targetTop = targetRect.top + scrollTop;
    var halfTargetHeight = Math.round(target.offsetHeight / 2);

    // default to middle, but don't go below body
    top = Math.max(targetTop + halfTargetHeight - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop);

    // make sure it doesn't go below the arrow
    top = Math.min(top, targetTop - minArrowPadding);

    // check for bottom overhang
    var bottomOverhang = top - scrollTop + tip.offsetHeight + bodyPadding - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, targetRect.bottom + scrollTop + minArrowPadding - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + distance;
    } else {
      left = targetRect.left - distance - tip.offsetWidth;
    }
  }

  return {
    left: left,
    top: top
  };
}

/**
 * Returns the positions style rules
 */
function positions(direction, tip, target, state, props) {
  var realDirection = (0, _getDirection2.default)(direction, tip, target, distance, bodyPadding);
  var maxWidth = getTipMaxWidth();

  switch (realDirection) {
    case 'right':
      return {
        tip: _extends({}, getLeftRightPosition(tip, target, state, 'right'), {
          maxWidth: maxWidth
        }),
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
        tip: _extends({}, getLeftRightPosition(tip, target, state, 'left'), {
          maxWidth: maxWidth
        }),
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
        tip: _extends({}, getUpDownPosition(tip, target, state, 'up'), {
          maxWidth: maxWidth
        }),
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
        tip: _extends({}, getUpDownPosition(tip, target, state, 'down'), {
          maxWidth: maxWidth
        }),
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