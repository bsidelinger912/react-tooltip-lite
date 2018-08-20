/**
 * @class Tooltip
 * @description A lightweight and responsive tooltip.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Portal from 'react-minimalist-portal';
import positions from './position';

// default colors
const defaultColor = '#fff';
const defaultBg = '#333';

const stopProp = e => e.stopPropagation();

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
    isOpen: PropTypes.bool,
    hoverDelay: PropTypes.number,
    tipContentHover: PropTypes.bool,
    arrow: PropTypes.bool,
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
    hoverDelay: 200,
    tipContentHover: false,
    arrow: true,
  }

  constructor() {
    super();

    this.state = { showTip: false, hasHover: false, ignoreShow: false };

    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.toggleTip = this.toggleTip.bind(this);
    this.startHover = this.startHover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  componentDidMount() {
    // if the isOpen prop is passed on first render we need to immediately trigger a second render,
    // because the tip ref is needed to calculate the position
    if (this.props.isOpen) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isOpen: true });
    }
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

      setTimeout(this.checkHover, this.props.hoverDelay);
    }
  }

  endHover() {
    this.setState({ hasHover: false });

    setTimeout(this.checkHover, this.props.hoverDelay);
  }

  checkHover() {
    this.setState({ showTip: this.state.hasHover });
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
      isOpen,
      tipContentHover,
      arrow,
    } = this.props;

    const showTip = (typeof isOpen === 'undefined') ? this.state.showTip : isOpen;
    const currentPositions = positions(direction, this.tip, this.target, { ...this.state, showTip }, {
      background: useDefaultStyles ? defaultBg : background,
      arrow,
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

    const portalProps = {};

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

    return (
      <this.props.tagName {...props}>
        {children}

        <Portal>
          <div {...portalProps} className={className}>
            <span className="react-tooltip-lite" style={tipStyles} ref={(tip) => { this.tip = tip; }}>
              {content}
            </span>
            <span className={`react-tooltip-lite-arrow react-tooltip-lite-${currentPositions.realDirection}-arrow`} style={arrowStyles} />
          </div>
        </Portal>
      </this.props.tagName>
    );
  }
}

export default Tooltip;
