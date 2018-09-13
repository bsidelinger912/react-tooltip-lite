/**
 * Checks the intended tip direction and falls back if not enough space
 */
import { arrowSize, getScrollLeft } from "./position";

function checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) {
  const targetRect = target.getBoundingClientRect();
  const deadSpace = Math.min(targetRect.left, document.documentElement.clientWidth - targetRect.right);

  return (tip.offsetWidth + target.offsetWidth + distance + bodyPadding + deadSpace < document.documentElement.clientWidth);
}

function checkTargetFullyVisible(target) {
  const bottomOverhang = target.getBoundingClientRect().bottom > window.innerHeight;
  const topOverhang = target.getBoundingClientRect().top < 0;

  return (!bottomOverhang && !topOverhang);
}

function checkForArrowOverhang(tip, arrowStyles, bodyPadding) {
  const scrollLeft = getScrollLeft();
  const hasLeftClearance = arrowStyles.left - scrollLeft > bodyPadding;
  const hasRightClearance = arrowStyles.left + (arrowSize * 2) < (scrollLeft + document.documentElement.clientWidth) - bodyPadding;
  
  return (!hasLeftClearance || !hasRightClearance);
}

export default function getDirection(currentDirection, tip, target, distance, bodyPadding, arrowStyles, recursive) {
  // can't switch until target is rendered
  if (!target) {
    return currentDirection;
  }

  const targetRect = target.getBoundingClientRect();
  
  switch (currentDirection) {
    case 'right':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) || !checkTargetFullyVisible(target)) {
        return getDirection('up', tip, target, distance, bodyPadding, arrowStyles, true);
      }

      if (document.documentElement.clientWidth - targetRect.right < tip.offsetWidth + distance + bodyPadding) {
        return 'left';
      }

      return 'right';

    case 'left':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) || !checkTargetFullyVisible(target)) {
        return getDirection('up', tip, target, distance, bodyPadding, arrowStyles, true);
      }

      if (targetRect.left < tip.offsetWidth + distance + bodyPadding) {
        return 'right';
      }

      return 'left';

    case 'up':
      if (!recursive && arrowStyles && checkForArrowOverhang(tip, arrowStyles, bodyPadding)) {
        return getDirection('left', tip, target, distance, bodyPadding, arrowStyles, true);
      }
      
      if (targetRect.top < tip.offsetHeight + distance + bodyPadding) {
        return 'down';
      }

      return 'up';

    case 'down':
    default:
      if (!recursive && arrowStyles && checkForArrowOverhang(tip, arrowStyles, bodyPadding)) {
        return getDirection('right', tip, target, distance, bodyPadding, arrowStyles, true);
      }
    
      if ((window.innerHeight - targetRect.bottom) < tip.offsetHeight + distance + bodyPadding) {
        return 'up';
      }

      return 'down';
  }
}
