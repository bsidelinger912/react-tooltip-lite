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

var bodyPadding = 10;
var minArrowPadding = 5;
var arrowSize = 10;
var noArrowDistance = 3;

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
 * Parses align mode from direction if specified with hyphen, defaulting to middle if not -
 * e.g. 'left-start' is mode 'start' and 'left' would be the default of 'middle'
 */
function parseAlignMode(direction) {
  var directionArray = direction.split('-');
  if (directionArray.length > 1) {
    return directionArray[1];
  }
  return 'middle';
}

/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top = void 0;

  var arrowSpacing = props.arrow ? arrowSize : noArrowDistance;

  if (tip && state.showTip) {
    // get wrapper left position
    var targetRect = target.getBoundingClientRect();
    var targetLeft = targetRect.left + getScrollLeft();

    var halfTargetWidth = Math.round(target.offsetWidth / 2);
    var tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);
    var arrowCenter = targetLeft + halfTargetWidth;
    var arrowLeft = arrowCenter - arrowSize;
    var arrowRight = arrowCenter + arrowSize;

    if (alignMode === 'start') {
      left = props.arrow ? Math.min(arrowLeft, targetLeft) : targetLeft;
    } else if (alignMode === 'end') {
      var rightWithArrow = Math.max(arrowRight, targetLeft + target.offsetWidth);
      var rightEdge = props.arrow ? rightWithArrow : targetLeft + target.offsetWidth;
      left = rightEdge - tipWidth;
    } else {
      left = Math.max(targetLeft + halfTargetWidth - Math.round(tipWidth / 2), bodyPadding + getScrollLeft());
    }

    // check for right overhang
    var rightOverhang = left + tipWidth + bodyPadding - document.documentElement.clientWidth;
    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = targetRect.top + getScrollTop() - (tip.offsetHeight + arrowSpacing);
    } else {
      top = targetRect.bottom + getScrollTop() + arrowSpacing;
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
function getLeftRightPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top = 0;

  var arrowSpacing = props.arrow ? arrowSize : noArrowDistance;
  var arrowPadding = props.arrow ? minArrowPadding : 0;

  if (tip && state.showTip) {
    var scrollTop = getScrollTop();
    var targetRect = target.getBoundingClientRect();
    var targetTop = targetRect.top + scrollTop;
    var halfTargetHeight = Math.round(target.offsetHeight / 2);
    var arrowTop = targetTop + halfTargetHeight - arrowSpacing;
    var arrowBottom = targetRect.top + scrollTop + halfTargetHeight + arrowSpacing;

    // TODO: handle close to edges better
    if (alignMode === 'start') {
      top = Math.min(targetTop, arrowTop);
    } else if (alignMode === 'end') {
      top = Math.max(targetRect.bottom + scrollTop - tip.offsetHeight, arrowBottom - tip.offsetHeight);
    } else {
      // default to middle, but don't go below body
      var centeredTop = Math.max(targetTop + halfTargetHeight - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop);

      // make sure it doesn't go below the arrow
      top = Math.min(centeredTop, arrowTop - arrowPadding);
    }

    // check for bottom overhang
    var bottomOverhang = top - scrollTop + tip.offsetHeight + bodyPadding - window.innerHeight;
    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, arrowBottom + arrowPadding - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + arrowSpacing;
    } else {
      left = targetRect.left - arrowSpacing - tip.offsetWidth;
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
  if (!target || !props.arrow) {
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
        borderRight: props.background !== '' ? arrowSize + 'px solid ' + props.background : '',
        borderTop: arrowSize + 'px solid transparent',
        borderBottom: arrowSize + 'px solid transparent'
      };

    case 'left':
      return {
        top: state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - arrowSize : '-10000000px',
        left: targetRect.left + scrollLeft - arrowSize - 1,
        borderLeft: props.background !== '' ? arrowSize + 'px solid ' + props.background : '',
        borderTop: arrowSize + 'px solid transparent',
        borderBottom: arrowSize + 'px solid transparent'
      };

    case 'up':
      return {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - arrowSize : '-10000000px',
        top: targetRect.top + scrollTop - arrowSize,
        borderTop: props.background !== '' ? arrowSize + 'px solid ' + props.background : '',
        borderLeft: arrowSize + 'px solid transparent',
        borderRight: arrowSize + 'px solid transparent'
      };

    case 'down':
    default:
      return {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop,
        borderBottom: props.background !== '' ? '10px solid ' + props.background : '',
        borderLeft: arrowSize + 'px solid transparent',
        borderRight: arrowSize + 'px solid transparent'
      };
  }
}

/**
 * Returns the positions style rules
 */
function positions(direction, tip, target, state, props) {
  var alignMode = parseAlignMode(direction);
  var realDirection = (0, _getDirection2.default)(direction, tip, target, props.arrow ? arrowSize : 0, bodyPadding);
  var maxWidth = getTipMaxWidth();

  var tipPosition = realDirection === 'up' || realDirection === 'down' ? getUpDownPosition(tip, target, state, realDirection, alignMode, props) : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);

  return {
    tip: _extends({}, tipPosition, {
      maxWidth: maxWidth
    }),
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection: realDirection
  };
}