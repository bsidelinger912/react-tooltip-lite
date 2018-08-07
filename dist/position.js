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

// @TODO: consider which of these should be props that can be passed
var bodyPadding = 10;
var minArrowPadding = 5;
var arrowSize = 10;

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
  return typeof document !== 'undefined' ? document.documentElement.clientWidth - bodyPadding * 2 : 1000;
}

/**
 * Sets align mode, defaulting to middle
 */
function getAlignMode(direction) {
  var directionArray = direction.split('-');
  if (directionArray.length > 1) {
    return directionArray[1];
  }
  return direction;
}

/**
 *  Interpolates a scalr based on possible values of "start", "end" or "middle" (default)
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
  var left = -10000000;
  var top = void 0;

  if (tip && state.showTip) {
    // get wrapper left position
    var targetRect = target.getBoundingClientRect();
    var targetLeft = targetRect.left + getScrollLeft();

    var targetWidth = interpolateAlignOffset(alignMode, target.offsetWidth);
    var tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);

    // default to positioning specifed by offset, but must be higher than body padding
    left = Math.max(targetLeft + targetWidth - interpolateAlignOffset(alignMode, tipWidth), bodyPadding + getScrollLeft());

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
function getLeftRightPosition(tip, target, state, direction, distance, alignMode) {
  var left = -10000000;
  var top = 0;

  if (tip && state.showTip) {
    var scrollTop = getScrollTop();
    var targetRect = target.getBoundingClientRect();
    var targetTop = targetRect.top + scrollTop;
    var targetHeight = interpolateAlignOffset(alignMode, target.offsetHeight);

    // default to positioning specifed by offset, but don't go below body
    top = Math.max(targetTop + targetHeight - interpolateAlignOffset(alignMode, tip.offsetHeight), bodyPadding + scrollTop);

    // make sure it doesn't go below the arrow
    var arrowTop = targetTop + targetHeight - arrowSize;
    top = Math.min(top, arrowTop - minArrowPadding);

    // check for bottom overhang
    var bottomOverhang = top - scrollTop + tip.offsetHeight + bodyPadding - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      var arrowBottom = targetRect.top + scrollTop + targetHeight + arrowSize;
      top = Math.max(top - bottomOverhang, arrowBottom + minArrowPadding - tip.offsetHeight);
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
 * sets the Arrow styles based on direction
 */
function getArrowStyles(target, tip, direction, state, props) {
  if (!target) {
    return {
      top: '0',
      left: '-10000000px'
    };
  }

  var targetRect = target.getBoundingClientRect();
  var halfTargetHeight = Math.round(target.offsetHeight / 2);
  var halfTargetWidth = Math.round(target.offsetWidth / 2);
  var scrollTop = getScrollTop();
  var scrollLeft = getScrollLeft();

  switch (direction) {
    case 'right':
      return {
        top: state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - arrowSize : '-10000000px',
        left: targetRect.right + scrollLeft,
        borderRight: props.background !== '' ? '10px solid ' + props.background : '',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent'
      };

    case 'left':
      return {
        top: state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - arrowSize : '-10000000px',
        left: targetRect.left + scrollLeft - props.distance - 1,
        borderLeft: props.background !== '' ? '10px solid ' + props.background : '',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent'
      };

    case 'up':
      return {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - arrowSize : '-10000000px',
        top: targetRect.top + scrollTop - props.distance,
        borderTop: props.background !== '' ? '10px solid ' + props.background : '',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent'
      };

    case 'down':
    default:
      return {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop,
        borderBottom: props.background !== '' ? '10px solid ' + props.background : '',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent'
      };
  }
}

/**
 * Returns the positions style rules
 */
function positions(direction, tip, target, state, props) {
  var alignMode = getAlignMode(direction);
  var realDirection = (0, _getDirection2.default)(direction, tip, target, props.distance, bodyPadding);
  var maxWidth = getTipMaxWidth();

  var tipPosition = realDirection === 'up' || realDirection === 'down' ? getUpDownPosition(tip, target, state, realDirection, props.distance, alignMode) : getLeftRightPosition(tip, target, state, realDirection, props.distance, alignMode);

  return {
    tip: _extends({}, tipPosition, {
      maxWidth: maxWidth
    }),
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection: realDirection
  };
}