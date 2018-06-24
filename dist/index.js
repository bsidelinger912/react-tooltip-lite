'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMinimalistPortal = require('react-minimalist-portal');

var _reactMinimalistPortal2 = _interopRequireDefault(_reactMinimalistPortal);

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// default colors
var defaultColor = '#fff';
var defaultBg = '#333';

var stopProp = function stopProp(e) {
  return e.stopPropagation();
};

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this));

    _this.state = { showTip: false, hasHover: false, ignoreShow: false };

    _this.showTip = _this.showTip.bind(_this);
    _this.hideTip = _this.hideTip.bind(_this);
    _this.checkHover = _this.checkHover.bind(_this);
    _this.toggleTip = _this.toggleTip.bind(_this);
    _this.startHover = _this.startHover.bind(_this);
    _this.endHover = _this.endHover.bind(_this);
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'toggleTip',
    value: function toggleTip() {
      this.setState({ showTip: !this.state.showTip });
    }
  }, {
    key: 'showTip',
    value: function showTip() {
      this.setState({ showTip: true });
    }
  }, {
    key: 'hideTip',
    value: function hideTip() {
      this.setState({ hasHover: false });
      this.setState({ showTip: false });
    }
  }, {
    key: 'startHover',
    value: function startHover() {
      if (!this.state.ignoreShow) {
        this.setState({ hasHover: true });

        setTimeout(this.checkHover, this.props.hoverDelay);
      }
    }
  }, {
    key: 'endHover',
    value: function endHover() {
      this.setState({ hasHover: false });

      setTimeout(this.checkHover, this.props.hoverDelay);
    }
  }, {
    key: 'checkHover',
    value: function checkHover() {
      this.setState({ showTip: this.state.hasHover });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          direction = _props.direction,
          className = _props.className,
          padding = _props.padding,
          children = _props.children,
          content = _props.content,
          styles = _props.styles,
          eventOn = _props.eventOn,
          eventOff = _props.eventOff,
          eventToggle = _props.eventToggle,
          useHover = _props.useHover,
          background = _props.background,
          color = _props.color,
          useDefaultStyles = _props.useDefaultStyles,
          isOpen = _props.isOpen,
          tipContentHover = _props.tipContentHover;


      var showTip = typeof isOpen === 'undefined' ? this.state.showTip : isOpen;
      var currentPositions = (0, _position2.default)(direction, this.tip, this.target, _extends({}, this.state, { showTip: showTip }), {
        background: useDefaultStyles ? defaultBg : background
      });

      var wrapperStyles = _extends({
        position: 'relative'
      }, styles);

      var tipStyles = _extends({}, currentPositions.tip, {
        background: useDefaultStyles ? defaultBg : background,
        color: useDefaultStyles ? defaultColor : color,
        padding: padding,
        boxSizing: 'border-box',
        zIndex: 1000,
        position: 'absolute',
        display: 'inline-block'
      });

      var arrowStyles = _extends({}, currentPositions.arrow, {
        position: 'absolute',
        width: '0px',
        height: '0px',
        zIndex: 1001
      });

      var props = {
        style: wrapperStyles,
        ref: function ref(target) {
          _this2.target = target;
        },
        className: className
      };

      var portalProps = {};

      // event handling
      if (eventOff) {
        props[eventOff] = this.hideTip;
      }

      if (eventOn) {
        props[eventOn] = this.showTip;
      }

      if (eventToggle) {
        props[eventToggle] = this.toggleTip;

        // only use hover if they don't have a toggle event
      } else if (useHover) {
        props.onMouseOver = this.startHover;
        props.onMouseOut = tipContentHover ? this.endHover : this.hideTip;
        props.onTouchStart = this.toggleTip;

        if (tipContentHover) {
          portalProps.onMouseOver = this.startHover;
          portalProps.onMouseOut = this.endHover;
          portalProps.onTouchStart = stopProp;
        }
      }

      return _react2.default.createElement(
        this.props.tagName,
        props,
        children,
        _react2.default.createElement(
          _reactMinimalistPortal2.default,
          null,
          _react2.default.createElement(
            'div',
            _extends({}, portalProps, { className: className }),
            _react2.default.createElement(
              'span',
              { className: 'react-tooltip-lite', style: tipStyles, ref: function ref(tip) {
                  _this2.tip = tip;
                } },
              content
            ),
            _react2.default.createElement('span', { className: 'react-tooltip-lite-arrow react-tooltip-lite-' + currentPositions.realDirection + '-arrow', style: arrowStyles })
          )
        )
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  tagName: _propTypes2.default.string,
  direction: _propTypes2.default.string,
  className: _propTypes2.default.string,
  content: _propTypes2.default.node.isRequired,
  background: _propTypes2.default.string,
  color: _propTypes2.default.string,
  padding: _propTypes2.default.string,
  styles: _propTypes2.default.object,
  eventOff: _propTypes2.default.string,
  eventOn: _propTypes2.default.string,
  eventToggle: _propTypes2.default.string,
  useHover: _propTypes2.default.bool,
  useDefaultStyles: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool,
  hoverDelay: _propTypes2.default.number,
  tipContentHover: _propTypes2.default.bool
};
Tooltip.defaultProps = {
  tagName: 'div',
  direction: 'up',
  className: '',
  background: '',
  color: '',
  padding: '10px',
  styles: {},
  useHover: true,
  useDefaultStyles: false,
  hoverDelay: 200,
  tipContentHover: false
};
exports.default = Tooltip;