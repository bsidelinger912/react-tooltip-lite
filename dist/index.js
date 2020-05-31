"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireWildcard(require("./Portal"));

var _position = _interopRequireDefault(require("./position"));

var _functions = require("./functions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// default colors
var defaultColor = '#fff';
var defaultBg = '#333';
var resizeThrottle = 100;
var resizeThreshold = 5;

var stopProp = function stopProp(e) {
  return e.stopPropagation();
};

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  _createClass(Tooltip, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return _Portal.isBrowser && nextProps.isOpen ? {
        hasBeenShown: true
      } : null;
    }
  }]);

  function Tooltip() {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this));

    _defineProperty(_assertThisInitialized(_this), "debounceTimeout", false);

    _defineProperty(_assertThisInitialized(_this), "hoverTimeout", false);

    _this.state = {
      showTip: false,
      hasHover: false,
      ignoreShow: false,
      hasBeenShown: false
    };
    _this.showTip = _this.showTip.bind(_assertThisInitialized(_this));
    _this.hideTip = _this.hideTip.bind(_assertThisInitialized(_this));
    _this.checkHover = _this.checkHover.bind(_assertThisInitialized(_this));
    _this.toggleTip = _this.toggleTip.bind(_assertThisInitialized(_this));
    _this.startHover = _this.startHover.bind(_assertThisInitialized(_this));
    _this.endHover = _this.endHover.bind(_assertThisInitialized(_this));
    _this.listenResizeScroll = _this.listenResizeScroll.bind(_assertThisInitialized(_this));
    _this.handleResizeScroll = _this.handleResizeScroll.bind(_assertThisInitialized(_this));
    _this.bodyTouchStart = _this.bodyTouchStart.bind(_assertThisInitialized(_this));
    _this.bodyTouchEnd = _this.bodyTouchEnd.bind(_assertThisInitialized(_this));
    _this.targetTouchStart = _this.targetTouchStart.bind(_assertThisInitialized(_this));
    _this.targetTouchEnd = _this.targetTouchEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // if the isOpen prop is passed on first render we need to immediately trigger a second render,
      // because the tip ref is needed to calculate the position
      if (this.props.isOpen) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          isOpen: true
        });
      }

      this.scrollParent = (0, _functions.getScrollParent)(this.target);
      window.addEventListener('resize', this.listenResizeScroll);
      this.scrollParent.addEventListener('scroll', this.listenResizeScroll);
      window.addEventListener('touchstart', this.bodyTouchStart);
      window.addEventListener('touchEnd', this.bodyTouchEnd);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      // older versions of react won't leverage getDerivedStateFromProps, TODO: remove when < 16.3 support is dropped
      if (!this.state.hasBeenShown && this.props.isOpen) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          hasBeenShown: true
        });
        return setTimeout(this.showTip, 0);
      } // we need to render once to get refs in place, then we can make the calculations on a followup render
      // this only has to happen the first time the tip is shown, and allows us to not render every tip on the page with initial render.


      if (!prevState.hasBeenShown && this.state.hasBeenShown) {
        this.showTip();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.listenResizeScroll);
      this.scrollParent.removeEventListener('scroll', this.listenResizeScroll);
      window.removeEventListener('touchstart', this.bodyTouchStart);
      window.removeEventListener('touchEnd', this.bodyTouchEnd);
      clearTimeout(this.debounceTimeout);
      clearTimeout(this.hoverTimeout);
    }
  }, {
    key: "listenResizeScroll",
    value: function listenResizeScroll() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(this.handleResizeScroll, resizeThrottle);

      if (this.state.targetTouch) {
        this.setState({
          targetTouch: undefined
        });
      }
    }
  }, {
    key: "handleResizeScroll",
    value: function handleResizeScroll() {
      if (this.state.showTip) {
        // if we're showing the tip and the resize was actually a signifigant change, then setState to re-render and calculate position
        var clientWidth = Math.round(document.documentElement.clientWidth / resizeThreshold) * resizeThreshold;
        this.setState({
          clientWidth: clientWidth
        });
      }
    }
  }, {
    key: "targetTouchStart",
    value: function targetTouchStart() {
      this.setState({
        targetTouch: true
      });
    }
  }, {
    key: "targetTouchEnd",
    value: function targetTouchEnd() {
      if (this.state.targetTouch) {
        this.toggleTip();
      }
    }
  }, {
    key: "bodyTouchEnd",
    value: function bodyTouchEnd() {
      if (this.state.targetTouch) {
        this.setState({
          targetTouch: undefined
        });
      }
    }
  }, {
    key: "bodyTouchStart",
    value: function bodyTouchStart(e) {
      // if it's a controlled tip we don't want to auto-dismiss, otherwise we just ignore taps inside the tip
      if (!(this.target && this.target.contains(e.target)) && !(this.tip && this.tip.contains(e.target)) && !this.props.isOpen) {
        this.hideTip();
      }
    }
  }, {
    key: "toggleTip",
    value: function toggleTip() {
      this.state.showTip ? this.hideTip() : this.showTip();
    }
  }, {
    key: "showTip",
    value: function showTip() {
      var _this2 = this;

      if (!this.state.hasBeenShown) {
        // this will render once, then fire componentDidUpdate, which will show the tip
        return this.setState({
          hasBeenShown: true
        });
      }

      if (!this.state.showTip) {
        this.setState({
          showTip: true
        }, function () {
          if (typeof _this2.props.onToggle === 'function') {
            _this2.props.onToggle(_this2.state.showTip);
          }
        });
      }
    }
  }, {
    key: "hideTip",
    value: function hideTip() {
      var _this3 = this;

      this.setState({
        hasHover: false
      });

      if (this.state.showTip) {
        this.setState({
          showTip: false
        }, function () {
          if (typeof _this3.props.onToggle === 'function') {
            _this3.props.onToggle(_this3.state.showTip);
          }
        });
      }
    }
  }, {
    key: "startHover",
    value: function startHover() {
      if (!this.state.ignoreShow) {
        this.setState({
          hasHover: true
        });
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = setTimeout(this.checkHover, this.props.hoverDelay);
      }
    }
  }, {
    key: "endHover",
    value: function endHover() {
      this.setState({
        hasHover: false
      });
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(this.checkHover, this.props.mouseOutDelay || this.props.hoverDelay);
    }
  }, {
    key: "checkHover",
    value: function checkHover() {
      this.state.hasHover ? this.showTip() : this.hideTip();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          arrow = _this$props.arrow,
          arrowSize = _this$props.arrowSize,
          background = _this$props.background,
          className = _this$props.className,
          children = _this$props.children,
          color = _this$props.color,
          content = _this$props.content,
          direction = _this$props.direction,
          distance = _this$props.distance,
          eventOff = _this$props.eventOff,
          eventOn = _this$props.eventOn,
          eventToggle = _this$props.eventToggle,
          forceDirection = _this$props.forceDirection,
          isOpen = _this$props.isOpen,
          mouseOutDelay = _this$props.mouseOutDelay,
          padding = _this$props.padding,
          styles = _this$props.styles,
          TagName = _this$props.tagName,
          tipContentHover = _this$props.tipContentHover,
          tipContentClassName = _this$props.tipContentClassName,
          useDefaultStyles = _this$props.useDefaultStyles,
          useHover = _this$props.useHover,
          arrowContent = _this$props.arrowContent;
      var isControlledByProps = typeof isOpen !== 'undefined' && isOpen !== null;
      var showTip = isControlledByProps ? isOpen : this.state.showTip;

      var wrapperStyles = _objectSpread({
        position: 'relative'
      }, styles);

      var props = {
        style: wrapperStyles,
        ref: function ref(target) {
          _this4.target = target;
        },
        className: className
      };
      var portalProps = {
        // keep clicks on the tip from closing click controlled tips
        onClick: stopProp
      }; // event handling

      if (eventOff) {
        props[eventOff] = this.hideTip;
      }

      if (eventOn) {
        props[eventOn] = this.showTip;
      }

      if (eventToggle) {
        props[eventToggle] = this.toggleTip; // only use hover if they don't have a toggle event
      } else if (useHover && !isControlledByProps) {
        props.onMouseEnter = this.startHover;
        props.onMouseLeave = tipContentHover || mouseOutDelay ? this.endHover : this.hideTip;
        props.onTouchStart = this.targetTouchStart;
        props.onTouchEnd = this.targetTouchEnd;

        if (tipContentHover) {
          portalProps.onMouseEnter = this.startHover;
          portalProps.onMouseLeave = this.endHover;
          portalProps.onTouchStart = stopProp;
        }
      } // conditional rendering of tip


      var tipPortal;

      if (this.state.hasBeenShown) {
        var currentPositions = (0, _position["default"])(direction, forceDirection, this.tip, this.target, _objectSpread({}, this.state, {
          showTip: showTip
        }), {
          background: useDefaultStyles ? defaultBg : background,
          arrow: arrow,
          arrowSize: arrowSize,
          distance: distance
        });

        var tipStyles = _objectSpread({}, currentPositions.tip, {
          background: useDefaultStyles ? defaultBg : background,
          color: useDefaultStyles ? defaultColor : color,
          padding: padding,
          boxSizing: 'border-box',
          zIndex: this.props.zIndex,
          position: 'absolute',
          display: 'inline-block'
        });

        var arrowStyles = _objectSpread({}, currentPositions.arrow.positionStyles, arrowContent ? {} : currentPositions.arrow.borderStyles, {
          position: 'absolute',
          width: '0px',
          height: '0px',
          zIndex: this.props.zIndex + 1
        });

        tipPortal = _react["default"].createElement(_Portal["default"], null, _react["default"].createElement("div", _extends({}, portalProps, {
          className: typeof tipContentClassName !== 'undefined' ? tipContentClassName : className
        }), _react["default"].createElement("span", {
          className: "react-tooltip-lite",
          style: tipStyles,
          ref: function ref(tip) {
            _this4.tip = tip;
          }
        }, content), _react["default"].createElement("span", {
          className: "react-tooltip-lite-arrow react-tooltip-lite-".concat(currentPositions.realDirection, "-arrow"),
          style: arrowStyles
        }, arrowContent)));
      }

      return _react["default"].createElement(TagName, props, children, tipPortal);
    }
  }]);

  return Tooltip;
}(_react["default"].Component);

_defineProperty(Tooltip, "propTypes", {
  arrow: _propTypes["default"].bool,
  arrowSize: _propTypes["default"].number,
  background: _propTypes["default"].string,
  children: _propTypes["default"].node.isRequired,
  className: _propTypes["default"].string,
  color: _propTypes["default"].string,
  content: _propTypes["default"].node.isRequired,
  direction: _propTypes["default"].string,
  distance: _propTypes["default"].number,
  eventOff: _propTypes["default"].string,
  eventOn: _propTypes["default"].string,
  eventToggle: _propTypes["default"].string,
  forceDirection: _propTypes["default"].bool,
  hoverDelay: _propTypes["default"].number,
  isOpen: _propTypes["default"].bool,
  mouseOutDelay: _propTypes["default"].number,
  padding: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  styles: _propTypes["default"].object,
  tagName: _propTypes["default"].string,
  tipContentHover: _propTypes["default"].bool,
  tipContentClassName: _propTypes["default"].string,
  useDefaultStyles: _propTypes["default"].bool,
  useHover: _propTypes["default"].bool,
  zIndex: _propTypes["default"].number,
  onToggle: _propTypes["default"].func,
  arrowContent: _propTypes["default"].node
});

_defineProperty(Tooltip, "defaultProps", {
  arrow: true,
  arrowSize: 10,
  background: '',
  className: '',
  color: '',
  direction: 'up',
  distance: undefined,
  eventOff: undefined,
  eventOn: undefined,
  eventToggle: undefined,
  forceDirection: false,
  hoverDelay: 200,
  isOpen: undefined,
  mouseOutDelay: undefined,
  padding: '10px',
  styles: {},
  tagName: 'div',
  tipContentHover: false,
  tipContentClassName: undefined,
  useDefaultStyles: false,
  useHover: true,
  zIndex: 1000,
  onToggle: undefined,
  arrowContent: null
});

var _default = Tooltip;
exports["default"] = _default;