"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollTop = getScrollTop;
exports.getScrollLeft = getScrollLeft;
exports.getArrowSpacing = getArrowSpacing;
exports.getScrollParent = getScrollParent;
exports.noArrowDistance = exports.bodyPadding = exports.minArrowPadding = void 0;

/**
 * a handful of shared functions and constants
 */
var minArrowPadding = 5;
exports.minArrowPadding = minArrowPadding;
var bodyPadding = 10;
exports.bodyPadding = bodyPadding;
var noArrowDistance = 3;
/**
 * cross browser scroll positions
 */

exports.noArrowDistance = noArrowDistance;

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

function getArrowSpacing(props) {
  var defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance;
  return typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;
}
/**
 * get first ancestor that might scroll
 */


function getScrollParent(element) {
  var style = getComputedStyle(element);
  var scrollParent = window;

  if (style.position !== 'fixed') {
    var parent = element.parentElement;

    while (parent) {
      var parentStyle = getComputedStyle(parent);

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