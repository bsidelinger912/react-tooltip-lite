/**
 * @class Tooltip
 * @description A lightweight and responsive tooltip.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Portal, { isBrowser } from './Portal';
import positions from './position';
import { getScrollParent } from './functions';

// default colors
const defaultColor = '#fff';
const defaultBg = '#333';

const resizeThrottle = 100;
const resizeThreshold = 5;

const stopProp = e => e.stopPropagation();

class Tooltip extends React.Component {
  static propTypes = {
    arrow: PropTypes.bool,
    arrowSize: PropTypes.number,
    background: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.node.isRequired,
    direction: PropTypes.string,
    distance: PropTypes.number,
    eventOff: PropTypes.string,
    eventOn: PropTypes.string,
    eventToggle: PropTypes.string,
    forceDirection: PropTypes.bool,
    hoverDelay: PropTypes.number,
    isOpen: PropTypes.bool,
    mouseOutDelay: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    styles: PropTypes.object,
    tagName: PropTypes.string,
    tipContentHover: PropTypes.bool,
    tipContentClassName: PropTypes.string,
    useDefaultStyles: PropTypes.bool,
    useHover: PropTypes.bool,
    zIndex: PropTypes.number,
    onToggle: PropTypes.func,
    arrowContent: PropTypes.node,
  }

  static defaultProps = {
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
    arrowContent: null,
  }

  static getDerivedStateFromProps(nextProps) {
    return isBrowser && nextProps.isOpen ? { hasBeenShown: true } : null;
  }

  debounceTimeout = false;

  hoverTimeout = false;

  constructor() {
    super();

    this.state = {
      showTip: false,
      hasHover: false,
      ignoreShow: false,
      hasBeenShown: false,
    };

    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.toggleTip = this.toggleTip.bind(this);
    this.startHover = this.startHover.bind(this);
    this.endHover = this.endHover.bind(this);
    this.listenResizeScroll = this.listenResizeScroll.bind(this);
    this.handleResizeScroll = this.handleResizeScroll.bind(this);
    this.bodyTouchStart = this.bodyTouchStart.bind(this);
    this.bodyTouchEnd = this.bodyTouchEnd.bind(this);
    this.targetTouchStart = this.targetTouchStart.bind(this);
    this.targetTouchEnd = this.targetTouchEnd.bind(this);
  }

  componentDidMount() {
    // if the isOpen prop is passed on first render we need to immediately trigger a second render,
    // because the tip ref is needed to calculate the position
    if (this.props.isOpen) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isOpen: true });
    }

    this.scrollParent = getScrollParent(this.target);

    window.addEventListener('resize', this.listenResizeScroll);
    this.scrollParent.addEventListener('scroll', this.listenResizeScroll);
    window.addEventListener('touchstart', this.bodyTouchStart);
    window.addEventListener('touchEnd', this.bodyTouchEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    // older versions of react won't leverage getDerivedStateFromProps, TODO: remove when < 16.3 support is dropped
    if (!this.state.hasBeenShown && this.props.isOpen) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasBeenShown: true });

      return setTimeout(this.showTip, 0);
    }

    // we need to render once to get refs in place, then we can make the calculations on a followup render
    // this only has to happen the first time the tip is shown, and allows us to not render every tip on the page with initial render.
    if (!prevState.hasBeenShown && this.state.hasBeenShown) {
      this.showTip();
    }

    if (this.props.isOpen === false && prevProps.isOpen !== this.props.isOpen) {
      this.hideTip();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listenResizeScroll);
    this.scrollParent.removeEventListener('scroll', this.listenResizeScroll);
    window.removeEventListener('touchstart', this.bodyTouchStart);
    window.removeEventListener('touchEnd', this.bodyTouchEnd);
    clearTimeout(this.debounceTimeout);
    clearTimeout(this.hoverTimeout);
  }

  listenResizeScroll() {
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(this.handleResizeScroll, resizeThrottle);

    if (this.state.targetTouch) {
      this.setState({ targetTouch: undefined });
    }
  }

  handleResizeScroll() {
    if (this.state.showTip) {
      // if we're showing the tip and the resize was actually a signifigant change, then setState to re-render and calculate position
      const clientWidth = Math.round(document.documentElement.clientWidth / resizeThreshold) * resizeThreshold;
      this.setState({ clientWidth });
    }
  }

  targetTouchStart() {
    this.setState({ targetTouch: true });
  }

  targetTouchEnd() {
    if (this.state.targetTouch) {
      this.toggleTip();
    }
  }

  bodyTouchEnd() {
    if (this.state.targetTouch) {
      this.setState({ targetTouch: undefined });
    }
  }

  bodyTouchStart(e) {
    // if it's a controlled tip we don't want to auto-dismiss, otherwise we just ignore taps inside the tip
    if (!(this.target && this.target.contains(e.target)) && !(this.tip && this.tip.contains(e.target)) && !this.props.isOpen) {
      this.hideTip();
    }
  }

  toggleTip() {
    this.state.showTip ? this.hideTip() : this.showTip();
  }

  showTip() {
    if (!this.state.hasBeenShown) {
      // this will render once, then fire componentDidUpdate, which will show the tip
      return this.setState({ hasBeenShown: true });
    }

    if (!this.state.showTip) {
      this.setState({ showTip: true }, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(this.state.showTip);
        }
      });
    }
  }

  hideTip() {
    this.setState({ hasHover: false });

    if (this.state.showTip) {
      this.setState({ showTip: false }, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(this.state.showTip);
        }
      });
    }
  }

  startHover() {
    if (!this.state.ignoreShow) {
      this.setState({ hasHover: true });

      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(this.checkHover, this.props.hoverDelay);
    }
  }

  endHover() {
    this.setState({ hasHover: false });

    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(this.checkHover, this.props.mouseOutDelay || this.props.hoverDelay);
  }

  checkHover() {
    this.state.hasHover ? this.showTip() : this.hideTip();
  }

  render() {
    const {
      arrow,
      arrowSize,
      background,
      className,
      children,
      color,
      content,
      direction,
      distance,
      eventOff,
      eventOn,
      eventToggle,
      forceDirection,
      isOpen,
      mouseOutDelay,
      padding,
      styles,
      tagName: TagName,
      tipContentHover,
      tipContentClassName,
      useDefaultStyles,
      useHover,
      arrowContent,
    } = this.props;

    const isControlledByProps = typeof isOpen !== 'undefined' && isOpen !== null;
    const showTip = isControlledByProps ? isOpen : this.state.showTip;

    const wrapperStyles = {
      position: 'relative',
      ...styles,
    };

    const props = {
      style: wrapperStyles,
      ref: (target) => { this.target = target; },
      className,
    };

    const portalProps = {
      // keep clicks on the tip from closing click controlled tips
      onClick: stopProp,
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
    } else if (useHover && !isControlledByProps) {
      props.onMouseEnter = this.startHover;
      props.onMouseLeave = (tipContentHover || mouseOutDelay) ? this.endHover : this.hideTip;
      props.onTouchStart = this.targetTouchStart;
      props.onTouchEnd = this.targetTouchEnd;

      if (tipContentHover) {
        portalProps.onMouseEnter = this.startHover;
        portalProps.onMouseLeave = this.endHover;
        portalProps.onTouchStart = stopProp;
      }
    }

    // conditional rendering of tip
    let tipPortal;

    if (this.state.hasBeenShown) {
      const currentPositions = positions(direction, forceDirection, this.tip, this.target, { ...this.state, showTip }, {
        background: useDefaultStyles ? defaultBg : background,
        arrow,
        arrowSize,
        distance,
      });

      const tipStyles = {
        ...currentPositions.tip,
        background: useDefaultStyles ? defaultBg : background,
        color: useDefaultStyles ? defaultColor : color,
        padding,
        boxSizing: 'border-box',
        zIndex: this.props.zIndex,
        position: 'absolute',
        display: 'inline-block',
      };

      const arrowStyles = {
        ...currentPositions.arrow.positionStyles,
        ...(arrowContent ? {} : currentPositions.arrow.borderStyles),
        position: 'absolute',
        width: '0px',
        height: '0px',
        zIndex: this.props.zIndex + 1,
      };

      tipPortal = (
        <Portal>
          <div {...portalProps} className={typeof tipContentClassName !== 'undefined' ? tipContentClassName : className}>
            <span className="react-tooltip-lite" style={tipStyles} ref={(tip) => { this.tip = tip; }}>
              {content}
            </span>
            <span className={`react-tooltip-lite-arrow react-tooltip-lite-${currentPositions.realDirection}-arrow`} style={arrowStyles}>{arrowContent}</span>
          </div>
        </Portal>
      );
    }

    return (
      <TagName {...props}>
        {children}
        {tipPortal}
      </TagName>
    );
  }
}

export default Tooltip;
