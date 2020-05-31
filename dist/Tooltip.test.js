"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
jest.useFakeTimers();
describe('Tooltip', function () {
  afterEach(function () {
    (0, _reactTestingLibrary.cleanup)();
  });
  var targetContent = 'Hello world';
  var tipContent = 'Tip content';

  function assertTipHidden(getByText) {
    expect(getByText(tipContent).style.transform).toEqual('translateX(-10000000px)');
  }

  function assertTipVisible(getByText) {
    expect(getByText(tipContent).style.transform).toBeFalsy();
  }

  it('should render and open with hover', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent
    }, targetContent)),
        getByText = _render.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);
  });
  it('should handle controlled state', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: false
    }, targetContent)),
        getByText = _render2.getByText,
        rerender = _render2.rerender,
        queryByText = _render2.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(queryByText(tipContent)).toBeNull();
    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: true
    }, targetContent));
    assertTipVisible(getByText);
    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: false
    }, targetContent));
    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should not open the tip when isVisible goes from false to undefined', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent
    }, targetContent)),
        rerender = _render3.rerender,
        getByText = _render3.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);
    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: false
    }, targetContent));
    jest.runAllTimers();
    assertTipHidden(getByText);
    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: false
    }, targetContent));
    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should handle null as undefined for isOpen prop', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: null
    }, targetContent)),
        getByText = _render4.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);
  });
  it('should handle eventOn prop and use mouseout', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventOn: "onClick"
    }, targetContent)),
        getByText = _render5.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should handle eventOff prop and use mouseover', function () {
    var _render6 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventOff: "onClick"
    }, targetContent)),
        getByText = _render6.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should handle eventToggle prop', function () {
    var _render7 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventToggle: "onClick"
    }, targetContent)),
        getByText = _render7.getByText,
        queryByText = _render7.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(queryByText(tipContent)).toBeNull();

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should use hoverDelay prop', function () {
    var hoverDelay = 1000;

    var _render8 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay
    }, targetContent)),
        getByText = _render8.getByText,
        queryByText = _render8.queryByText,
        rerender = _render8.rerender;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText); // hoverDelay is not used on mouseout for tips without the tipContentHoverProp prop

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipHidden(getByText); // with the tipContentHoverProp hoverDelay should be used with mouseOut

    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay,
      tipContentHover: true
    }, targetContent));

    _reactTestingLibrary.fireEvent.mouseOver(target);

    assertTipHidden(getByText);
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipVisible(getByText);
    jest.advanceTimersByTime(hoverDelay);
    assertTipHidden(getByText);
  });
  it('should use mouseOutDelay prop', function () {
    var hoverDelay = 500;
    var mouseOutDelay = 1000;

    var _render9 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay,
      mouseOutDelay: mouseOutDelay
    }, targetContent)),
        getByText = _render9.getByText,
        queryByText = _render9.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipVisible(getByText);
    jest.advanceTimersByTime(mouseOutDelay);
    assertTipHidden(getByText);
  });
  it('should support onToggle prop', function () {
    var spy = jest.fn();

    var _render10 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      onToggle: spy
    }, targetContent)),
        getByText = _render10.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith(true);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith(false);
  });
  it('should not call onToggle when the state is not actually changing', function () {
    var spy = jest.fn();

    var _render11 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      onToggle: spy
    }, targetContent)),
        container = _render11.container;

    _reactTestingLibrary.fireEvent.touchStart(container);

    expect(spy).not.toHaveBeenCalled();
  });
  it('should support zIndex prop', function () {
    var _render12 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      zIndex: 5000
    }, targetContent)),
        getByText = _render12.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    var tip = getByText(tipContent);
    var styles = window.getComputedStyle(tip);
    expect(styles['z-index']).toEqual('5000');
  });
  it('should support the arrowContent prop', function () {
    var _render13 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      arrowContent: _react["default"].createElement("svg", {
        "data-testid": "my-arrow",
        style: {
          display: 'block'
        },
        viewBox: "0 0 21 11",
        width: "20px",
        height: "10px"
      }, _react["default"].createElement("path", {
        d: "M0,11 L9.43630703,1.0733987 L9.43630703,1.0733987 C10.1266203,0.3284971 11.2459708,0 11.936284,1.0733987 L20,11",
        style: {
          stroke: 'gray',
          fill: 'white'
        }
      }))
    }, targetContent)),
        getByText = _render13.getByText,
        getByTestId = _render13.getByTestId;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    getByTestId('my-arrow');
  });
});