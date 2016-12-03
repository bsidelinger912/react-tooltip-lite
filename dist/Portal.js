'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Portal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description a portal element that puts the tooltip contents at the top of the document tree, outside the react app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instanceCounter = 0;

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

    _this.portalElement = null;
    return _this;
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // generate a unique ID
      instanceCounter += 1;
      var portalId = 'react-tooltip-lite-instace-' + instanceCounter;

      var el = document.getElementById(portalId);

      // add the div to the body if not there.
      if (!el) {
        el = document.createElement('div');
        el.id = portalId;
        document.body.appendChild(el);
      }

      this.portalElement = el;
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        { className: this.props.className },
        this.props.children
      ), this.portalElement);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeChild(this.portalElement);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(_react2.default.Component);

Portal.propTypes = {
  children: _react.PropTypes.node.isRequired
};
exports.default = Portal;