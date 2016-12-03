import React, { PropTypes } from 'react';

import Portal from './Portal';
import positions from './position';

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
  }

  static defaultProps = {
    tagName: 'div',
    direction: 'up',
    className: '',
    background: '',
    color: '',
    padding: '10px',
  }

  constructor() {
    super();

    this.state = { showTip: false };

    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
  }

  showTip() {
    this.setState({ showTip: true });
  }

  hideTip() {
    this.setState({ showTip: false });
  }

  render() {
    const { direction, className, color, background, padding } = this.props;
    const currentPositions = positions(direction, this.tip, this.target, this.state, this.props);

    const wrapperStyles = {
      position: 'relative',
    };

    const tipStyles = {
      ...currentPositions.tip,
      background,
      color,
      padding,
      boxSizing: 'border-box',
      zIndex: 100,
      position: 'absolute',
      display: 'inline-block',
    };

    const arrowStyles = {
      ...currentPositions.arrow,
      position: 'absolute',
      width: '0px',
      height: '0px',
      zIndex: 101,
    };

    return (
        <this.props.tagName
          onMouseEnter={this.showTip}
          onMouseLeave={this.hideTip}
          style={wrapperStyles}
          ref={(target) => { this.target = target; }}
          className={className}
        >
            {this.props.children}

            <Portal className={className}>
                <span className="react-tooltip-lite" style={tipStyles} ref={(tip) => { this.tip = tip; }}>
                    {this.props.content}
                </span>
            </Portal>

            <span className={`react-tooltip-lite-arrow react-tooltip-lite-${currentPositions.realDirection}-arrow`} style={arrowStyles} />

        </this.props.tagName>
    );
  }
}

export default Tooltip;
