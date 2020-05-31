"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = positions;

var _getDirection = _interopRequireDefault(require("./getDirection"));

var _functions = require("./functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Sets tip max width safely for mobile
 */
function getTipMaxWidth() {
  return typeof document !== 'undefined' ? document.documentElement.clientWidth - _functions.bodyPadding * 2 : 1000;
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
  var top;
  var transform = state.showTip ? undefined : 'translateX(-10000000px)';
  var arrowSpacing = (0, _functions.getArrowSpacing)(props);

  if (tip) {
    // get wrapper left position
    var scrollLeft = (0, _functions.getScrollLeft)();
    var targetRect = target.getBoundingClientRect();
    var targetLeft = targetRect.left + scrollLeft;
    var halfTargetWidth = Math.round(target.offsetWidth / 2);
    var tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);
    var arrowCenter = targetLeft + halfTargetWidth;
    var arrowLeft = arrowCenter - props.arrowSize;
    var arrowRight = arrowCenter + props.arrowSize;

    if (alignMode === 'start') {
      left = props.arrow ? Math.min(arrowLeft, targetLeft) : targetLeft;
    } else if (alignMode === 'end') {
      var rightWithArrow = Math.max(arrowRight, targetLeft + target.offsetWidth);
      var rightEdge = props.arrow ? rightWithArrow : targetLeft + target.offsetWidth;
      left = Math.max(rightEdge - tipWidth, _functions.bodyPadding + scrollLeft);
    } else {
      var centeredLeft = targetLeft + halfTargetWidth - Math.round(tipWidth / 2);
      var availableSpaceOnLeft = _functions.bodyPadding + scrollLeft;
      left = Math.max(centeredLeft, availableSpaceOnLeft);
    } // check for right overhang


    var rightOfTip = left + tipWidth;
    var rightOfScreen = scrollLeft + document.documentElement.clientWidth - _functions.bodyPadding;
    var rightOverhang = rightOfTip - rightOfScreen;

    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = targetRect.top + (0, _functions.getScrollTop)() - (tip.offsetHeight + arrowSpacing);
    } else {
      top = targetRect.bottom + (0, _functions.getScrollTop)() + arrowSpacing;
    }
  }

  return {
    left: left,
    top: top,
    transform: transform
  };
}
/**
 * gets top position for left/right arrows
 */


function getLeftRightPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top = 0;
  var transform = state.showTip ? undefined : 'translateX(-10000000px)';
  var arrowSpacing = (0, _functions.getArrowSpacing)(props);
  var arrowPadding = props.arrow ? _functions.minArrowPadding : 0;

  if (tip) {
    var scrollTop = (0, _functions.getScrollTop)();
    var scrollLeft = (0, _functions.getScrollLeft)();
    var targetRect = target.getBoundingClientRect();
    var targetTop = targetRect.top + scrollTop;
    var halfTargetHeight = Math.round(target.offsetHeight / 2);
    var arrowTop = targetTop + halfTargetHeight - props.arrowSize;
    var arrowBottom = targetRect.top + scrollTop + halfTargetHeight + props.arrowSize; // TODO: handle close to edges better

    if (alignMode === 'start') {
      top = props.arrow ? Math.min(targetTop, arrowTop) : targetTop;
    } else if (alignMode === 'end') {
      var topForBottomAlign = targetRect.bottom + scrollTop - tip.offsetHeight;
      top = props.arrow ? Math.max(topForBottomAlign, arrowBottom - tip.offsetHeight) : topForBottomAlign;
    } else {
      // default to middle, but don't go below body
      var centeredTop = Math.max(targetTop + halfTargetHeight - Math.round(tip.offsetHeight / 2), _functions.bodyPadding + scrollTop); // make sure it doesn't go below the arrow

      top = Math.min(centeredTop, arrowTop - arrowPadding);
    } // check for bottom overhang


    var bottomOverhang = top - scrollTop + tip.offsetHeight + _functions.bodyPadding - window.innerHeight;

    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, arrowBottom + arrowPadding - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + arrowSpacing + scrollLeft;
    } else {
      left = targetRect.left - arrowSpacing - tip.offsetWidth + scrollLeft;
    }
  }

  return {
    left: left,
    top: top,
    transform: transform
  };
}
/**
 * sets the Arrow styles based on direction
 */


function getArrowStyles(target, tip, direction, state, props) {
  if (!target || !props.arrow) {
    return {
      positionStyles: {
        top: '0',
        left: '-10000000px'
      }
    };
  }

  var targetRect = target.getBoundingClientRect();
  var halfTargetHeight = Math.round(target.offsetHeight / 2);
  var halfTargetWidth = Math.round(target.offsetWidth / 2);
  var scrollTop = (0, _functions.getScrollTop)();
  var scrollLeft = (0, _functions.getScrollLeft)();
  var arrowSpacing = (0, _functions.getArrowSpacing)(props);
  var borderStyles = {};
  var positionStyles = {};

  switch (direction) {
    case 'right':
      borderStyles.borderTop = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderBottom = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderRight = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderRightWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderRightStyle = 'solid';
      }

      positionStyles.top = state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - props.arrowSize : '-10000000px';
      positionStyles.left = targetRect.right + scrollLeft + arrowSpacing - props.arrowSize;
      break;

    case 'left':
      borderStyles.borderTop = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderBottom = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderLeft = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderLeftWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderLeftStyle = 'solid';
      }

      positionStyles.top = state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - props.arrowSize : '-10000000px';
      positionStyles.left = targetRect.left + scrollLeft - arrowSpacing - 1;
      break;

    case 'up':
      borderStyles.borderLeft = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderRight = "".concat(props.arrowSize, "px solid transparent"); // if color is styled with css, we need everything except border-color, if styled with props, we add entire border rule

      if (props.background) {
        borderStyles.borderTop = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderTopWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderTopStyle = 'solid';
      }

      positionStyles.left = state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - props.arrowSize : '-10000000px';
      positionStyles.top = targetRect.top + scrollTop - arrowSpacing;
      break;

    case 'down':
    default:
      borderStyles.borderLeft = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderRight = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderBottom = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderBottomWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderBottomStyle = 'solid';
      }

      positionStyles.left = state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - props.arrowSize : '-10000000px';
      positionStyles.top = targetRect.bottom + scrollTop + arrowSpacing - props.arrowSize;
      break;
  }

  return {
    borderStyles: borderStyles,
    positionStyles: positionStyles
  };
}
/**
 * Returns the positions style rules
 */


function positions(direction, forceDirection, tip, target, state, props) {
  var alignMode = parseAlignMode(direction);
  var trimmedDirection = direction.split('-')[0];
  var realDirection = trimmedDirection;

  if (!forceDirection && tip) {
    var testArrowStyles = props.arrow && getArrowStyles(target, tip, trimmedDirection, state, props);
    realDirection = (0, _getDirection["default"])(trimmedDirection, tip, target, props, _functions.bodyPadding, testArrowStyles);
  }

  var maxWidth = getTipMaxWidth(); // force the tip to display the width we measured everything at when visible

  var width;

  if (tip) {
    // adding the exact width on the first render forces a bogus line break, so add 1px the first time
    var spacer = tip.style.width ? 0 : 1;
    width = Math.min(tip.offsetWidth, maxWidth) + spacer;
  }

  var tipPosition = realDirection === 'up' || realDirection === 'down' ? getUpDownPosition(tip, target, state, realDirection, alignMode, props) : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);
  return {
    tip: _objectSpread({}, tipPosition, {
      maxWidth: maxWidth,
      width: width
    }),
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection: realDirection
  };
}