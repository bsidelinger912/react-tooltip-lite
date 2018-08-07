/**
 * Checks the intended tip direction and falls back if not enough space
 */

function checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) {
  const targetRect = target.getBoundingClientRect();
  const deadSpace = Math.min(targetRect.left, document.documentElement.clientWidth - targetRect.right);

  return (tip.offsetWidth + target.offsetWidth + distance + bodyPadding + deadSpace < document.documentElement.clientWidth);
}

function checkHalfHeightVisible(target) {
  const targetCenterFromWindow = target.getBoundingClientRect().top + Math.round(target.offsetHeight / 2);

  return (targetCenterFromWindow < window.innerHeight && targetCenterFromWindow > 0);
}

export default function getDirection(currentDirection, tip, target, distance, bodyPadding) {
  // can't switch until target is rendered
  if (!target) {
    return currentDirection;
  }

  // trim off direction alignment suffixes (i.e. any chars after "-")
  const trimmedDirection = currentDirection.split('-')[0];

  const targetRect = target.getBoundingClientRect();

  switch (trimmedDirection) {
    case 'right':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) || !checkHalfHeightVisible(target)) {
        return getDirection('up', tip, target, distance, bodyPadding);
      }

      if (document.documentElement.clientWidth - targetRect.right < tip.offsetWidth + distance + bodyPadding) {
        return 'left';
      }

      return 'right';

    case 'left':
      // if the window is not wide enough try top (which falls back to down)
      if (!checkLeftRightWidthSufficient(tip, target, distance, bodyPadding) || !checkHalfHeightVisible(target)) {
        return getDirection('up', tip, target, distance, bodyPadding);
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
