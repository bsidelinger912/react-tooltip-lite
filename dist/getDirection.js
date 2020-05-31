"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDirection;

var _functions = require("./functions");

/**
 * Checks the intended tip direction and falls back if not enough space
 */
function checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) {
  var targetRect = target.getBoundingClientRect();
  var deadSpace = Math.min(targetRect.left, document.documentElement.clientWidth - targetRect.right);
  return tip.offsetWidth + target.offsetWidth + distance + bodyPadding + deadSpace < document.documentElement.clientWidth;
}

function checkTargetSufficientlyVisible(target, tip, props) {
  var targetRect = target.getBoundingClientRect();
  var bottomOverhang = targetRect.bottom > window.innerHeight;
  var topOverhang = targetRect.top < 0; // if the target is taller than the viewport (and we know there's sufficient left/right width before this is called),
  // then go with the left/right direction as top/bottom will both be off screen

  if (topOverhang && bottomOverhang) {
    return true;
  } // if the target is bigger than the tip, we need to check if enough of the target is visible


  if (target.offsetHeight > tip.offsetHeight) {
    var halfTargetHeight = target.offsetHeight / 2;
    var arrowClearance = props.arrowSize + _functions.minArrowPadding;
    var bottomOverhangAmount = targetRect.bottom - window.innerHeight;
    var topOverhangAmount = -targetRect.top;
    var targetCenterToBottomOfWindow = halfTargetHeight - bottomOverhangAmount;
    var targetCenterToTopOfWindow = halfTargetHeight - topOverhangAmount;
    return targetCenterToBottomOfWindow >= arrowClearance && targetCenterToTopOfWindow >= arrowClearance;
  } // otherwise just check that the whole target is visible


  return !bottomOverhang && !topOverhang;
}

function checkForArrowOverhang(props, arrowStyles, bodyPadding) {
  var scrollLeft = (0, _functions.getScrollLeft)();
  var hasLeftClearance = arrowStyles.positionStyles.left - scrollLeft > bodyPadding;
  var hasRightClearance = arrowStyles.positionStyles.left + props.arrowSize * 2 < scrollLeft + document.documentElement.clientWidth - bodyPadding;
  return !hasLeftClearance || !hasRightClearance;
}

function getDirection(currentDirection, tip, target, props, bodyPadding, arrowStyles, recursive) {
  // can't switch until target is rendered
  if (!target) {
    return currentDirection;
  }

  var targetRect = target.getBoundingClientRect();
  var arrowSpacing = (0, _functions.getArrowSpacing)(props); // this is how much space is needed to display the tip above or below the target

  var heightOfTipWithArrow = tip.offsetHeight + arrowSpacing + bodyPadding;
  var spaceBelowTarget = window.innerHeight - targetRect.bottom;
  var spaceAboveTarget = targetRect.top;
  var hasSpaceBelow = spaceBelowTarget >= heightOfTipWithArrow;
  var hasSpaceAbove = spaceAboveTarget >= heightOfTipWithArrow;

  switch (currentDirection) {
    case 'right':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding) || !checkTargetSufficientlyVisible(target, tip, props)) {
        return getDirection('up', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
      }

      if (document.documentElement.clientWidth - targetRect.right < tip.offsetWidth + arrowSpacing + bodyPadding) {
        return 'left';
      }

      return 'right';

    case 'left':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding) || !checkTargetSufficientlyVisible(target, tip, props)) {
        return getDirection('up', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
      }

      if (targetRect.left < tip.offsetWidth + arrowSpacing + bodyPadding) {
        return 'right';
      }

      return 'left';

    case 'up':
      if (!recursive && arrowStyles && checkForArrowOverhang(props, arrowStyles, bodyPadding)) {
        return getDirection('left', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
      }

      if (!hasSpaceAbove) {
        if (hasSpaceBelow) {
          return 'down';
        }

        if (!recursive && checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding)) {
          return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
        }
      }

      return 'up';

    case 'down':
    default:
      if (!recursive && arrowStyles && checkForArrowOverhang(props, arrowStyles, bodyPadding)) {
        return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
      }

      if (!hasSpaceBelow) {
        // if there's no space below, but space above, switch to that direction
        if (hasSpaceAbove) {
          return 'up'; // if there's not space above or below, check if there would be space left or right
        }

        if (!recursive && checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding)) {
          return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
        } // if there's no space in any direction, default to the original direction

      }

      return 'down';
  }
}