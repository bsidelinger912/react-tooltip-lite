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

const resizeThrottle = 100;
const resizeThreshold = 5;

const stopProp = e => e.stopPropagation();

// TODO: check on issues with image targets in example where absolute image displays wrong on second hover
// and where if the image bottom isn't shown visible we send the tip up or down instead of right/left
// that's probably due to some logic that assumes the tip is taller than the target

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
    padding: PropTypes.string,
    styles: PropTypes.object,
    tagName: PropTypes.string,
    tipContentHover: PropTypes.bool,
    tipContentClassName: PropTypes.string,
    useDefaultStyles: PropTypes.bool,
    useHover: PropTypes.bool,
  }

  static defaultProps = {
    arrow: true,
    arrowSize: 10,
    background: '',
    className: '',
    color: '',
    direction: 'up',
    distance: undefined,
    forceDirection: false,
    hoverDelay: 200,
    padding: '10px',
    styles: {},
    tagName: 'div',
    tipContentHover: false,
    tipContentClassName: undefined,
    useDefaultStyles: false,
    useHover: true,
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.isOpen ? { hasBeenShown: true } : null;
  }

  constructor() {
    super();

    this.state = { showTip: false, hasHover: false, ignoreShow: false, hasBeenShown: false };

    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.toggleTip = this.toggleTip.bind(this);
    this.startHover = this.startHover.bind(this);
    this.endHover = this.endHover.bind(this);
    this.listenResize = this.listenResize.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    // if the isOpen prop is passed on first render we need to immediately trigger a second render,
    // because the tip ref is needed to calculate the position
    if (this.props.isOpen) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isOpen: true });
    }

    window.addEventListener('resize', this.listenResize);
  }

  componentDidUpdate(_, prevState) {
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listenResize);
    clearTimeout(this.debounceTimeout);
  }

  debounceTimeout = false;

  listenResize() {
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(this.handleResize, resizeThrottle);
  }

  handleResize() {
    if (this.state.showTip) {
      // if we're showing the tip and the resize was actually a signifigant change, then setState to re-render and calculate position
      const clientWidth = Math.round(document.documentElement.clientWidth / resizeThreshold) * resizeThreshold;
      this.setState({ clientWidth });
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

    this.setState({ showTip: true });
  }

  hideTip() {
    this.setState({ hasHover: false });
    this.setState({ showTip: false });
  }

  hoverTimeout = false;

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
    this.hoverTimeout = setTimeout(this.checkHover, this.props.hoverDelay);
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
      padding,
      styles,
      tagName: TagName,
      tipContentHover,
      tipContentClassName,
      useDefaultStyles,
      useHover,
    } = this.props;

    const isControlledByProps = !(typeof isOpen === 'undefined');
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
      props.onMouseOver = this.startHover;
      props.onMouseOut = tipContentHover ? this.endHover : this.hideTip;
      props.onTouchStart = this.toggleTip;

      if (tipContentHover) {
        portalProps.onMouseOver = this.startHover;
        portalProps.onMouseOut = this.endHover;
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

      tipPortal = (
        <Portal>
          <div {...portalProps} className={typeof tipContentClassName !== 'undefined' ? tipContentClassName : className}>
            <span className="react-tooltip-lite" style={tipStyles} ref={(tip) => { this.tip = tip; }}>
              {content}
            </span>
            <span className={`react-tooltip-lite-arrow react-tooltip-lite-${currentPositions.realDirection}-arrow`} style={arrowStyles} />
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
