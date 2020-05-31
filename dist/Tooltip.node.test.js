"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @jest-environment node
 */
describe('Node env', function () {
  var targetContent = 'Hello world';
  var tipContent = 'Tip content';
  it('doesnt blow up for ssr', function () {
    var string = (0, _server.renderToString)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: true
    }, targetContent));
    expect(string).toContain(targetContent);
    expect(string).not.toContain(tipContent);
  });
});