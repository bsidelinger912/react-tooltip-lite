'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this));

    _this.state = { showTip: false };

    _this.showTip = _this.showTip.bind(_this);
    _this.hideTip = _this.hideTip.bind(_this);
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'showTip',
    value: function showTip() {
      this.setState({ showTip: true });
    }
  }, {
    key: 'hideTip',
    value: function hideTip() {
      this.setState({ showTip: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          direction = _props.direction,
          className = _props.className,
          color = _props.color,
          background = _props.background,
          padding = _props.padding;

      var currentPositions = (0, _position2.default)(direction, this.tip, this.target, this.state, this.props);

      var wrapperStyles = {
        position: 'relative'
      };

      var tipStyles = _extends({}, currentPositions.tip, {
        background: background,
        color: color,
        padding: padding,
        boxSizing: 'border-box',
        zIndex: 100,
        position: 'absolute',
        display: 'inline-block'
      });

      var arrowStyles = _extends({}, currentPositions.arrow, {
        position: 'absolute',
        width: '0px',
        height: '0px',
        zIndex: 101
      });

      return _react2.default.createElement(
        this.props.tagName,
        {
          onMouseEnter: this.showTip,
          onMouseLeave: this.hideTip,
          style: wrapperStyles,
          ref: function ref(target) {
            _this2.target = target;
          },
          className: className
        },
        this.props.children,
        _react2.default.createElement(
          _Portal2.default,
          { className: className },
          _react2.default.createElement(
            'span',
            { className: 'react-tooltip-lite', style: tipStyles, ref: function ref(tip) {
                _this2.tip = tip;
              } },
            this.props.content
          )
        ),
        _react2.default.createElement('span', { className: 'react-tooltip-lite-arrow react-tooltip-lite-' + currentPositions.realDirection + '-arrow', style: arrowStyles })
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  tagName: _react.PropTypes.string,
  direction: _react.PropTypes.string,
  className: _react.PropTypes.string,
  content: _react.PropTypes.node.isRequired,
  background: _react.PropTypes.string,
  color: _react.PropTypes.string,
  padding: _react.PropTypes.string
};
Tooltip.defaultProps = {
  tagName: 'div',
  direction: 'up',
  className: '',
  background: '',
  color: '',
  padding: '10px'
};
exports.default = Tooltip;