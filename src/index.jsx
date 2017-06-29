import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal';
import positions from './position';

const hoverDelay = 200;
const touchToMouseOverDelay = 1000;

// default colors
const defaultColor = '#fff';
const defaultBg = '#333';

class Tooltip extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tagName: PropTypes.string,
    direction: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.node.isRequired,
    background: PropTypes.string,
    color: PropTypes.string,
    padding: PropTypes.string,
    styles: PropTypes.object,
    eventOff: PropTypes.string,
    eventOn: PropTypes.string,
    eventToggle: PropTypes.string,
    useHover: PropTypes.bool,
    useDefaultStyles: PropTypes.bool,
  }

  static defaultProps = {
    tagName: 'div',
    direction: 'up',
    className: '',
    background: '',
    color: '',
    padding: '10px',
    styles: {},
    useHover: true,
    useDefaultStyles: false,
  }

  constructor() {
    super();

    this.state = { showTip: false, hasHover: false, ignoreShow: false };

    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.cancelTip = this.cancelTip.bind(this);
    this.toggleTip = this.toggleTip.bind(this);
    this.startHover = this.startHover.bind(this);
  }

  toggleTip() {
    this.setState({ showTip: !this.state.showTip });
  }

  showTip() {
    this.setState({ showTip: true });
  }

  hideTip() {
    this.setState({ hasHover: false });
    this.setState({ showTip: false });
  }

  startHover() {
    if (!this.state.ignoreShow) {
      this.setState({ hasHover: true });

      setTimeout(this.checkHover, hoverDelay);
    }
  }

  checkHover() {
    if (this.state.hasHover) {
      this.setState({ showTip: true });
    }
  }

  cancelTip() {
    this.setState({ ignoreShow: true });

    setTimeout(() => { this.setState({ ignoreShow: false }); }, touchToMouseOverDelay);
  }

  render() {
    const {
      direction,
      className,
      padding,
      children,
      content,
      styles,
      eventOn,
      eventOff,
      eventToggle,
      useHover,
      background,
      color,
      useDefaultStyles,
    } = this.props;

    const currentPositions = positions(direction, this.tip, this.target, this.state, {
      background: useDefaultStyles ? defaultBg : background,
    });

    const wrapperStyles = {
      position: 'relative',
      ...styles,
    };

    const tipStyles = {
      ...currentPositions.tip,
      background: useDefaultStyles ? defaultBg : background,
      color: useDefaultStyles ? defaultColor : color,
      padding,
      boxSizing: 'border-box',
      zIndex: 1000,
      position: 'absolute',
      display: 'inline-block',
    };

    const arrowStyles = {
      ...currentPositions.arrow,
      position: 'absolute',
      width: '0px',
      height: '0px',
      zIndex: 1001,
    };

    const props = {
      style: wrapperStyles,
      ref: (target) => { this.target = target; },
      className,
    };

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
      props.onMouseOut = this.hideTip;
      props.onTouchStart = this.cancelTip;
    }

    return (
        <this.props.tagName {...props}>
            {children}

            <Portal className={className}>
                <span className="react-tooltip-lite" style={tipStyles} ref={(tip) => { this.tip = tip; }}>
                    {content}
                </span>
                <span className={`react-tooltip-lite-arrow react-tooltip-lite-${currentPositions.realDirection}-arrow`} style={arrowStyles} />
            </Portal>
        </this.props.tagName>
    );
  }
}

export default Tooltip;
