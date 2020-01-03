/**
 * a handful of shared functions and constants
 */

export const minArrowPadding = 5;
export const bodyPadding = 10;
export const noArrowDistance = 3;

/**
 * cross browser scroll positions
 */
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

export function getArrowSpacing(props) {
  const defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance;
  return typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;
}

/**
 * get first ancestor that might scroll
 */
export function getScrollParent(element) {
  const style = getComputedStyle(element);
  let scrollParent = window;

  if (style.position !== 'fixed') {
    let parent = element.parentElement;

    while (parent) {
      const parentStyle = getComputedStyle(parent);

      if (/(auto|scroll)/.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
        scrollParent = parent;
        parent = undefined;
      } else {
        parent = parent.parentElement;
      }
    }
  }

  return scrollParent;
}
