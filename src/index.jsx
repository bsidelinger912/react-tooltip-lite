import React, { PropTypes } from 'react';

import { positions } from './position';

class Tooltip extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tagName: PropTypes.string,
    direction: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.node.isRequired,
  }

  static defaultProps = {
    tagName: 'div',
    direction: 'up',
    className: '',
  }

  constructor() {
    super();

    this.state = { showTip: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ showTip: true });
  }

  handleMouseLeave() {
    this.setState({ showTip: false });
  }

  render() {
    const { direction, className } = this.props;
    const currentPositions = positions(direction, this.tip, this.target, this.state);

    const wrapperStyles = {
      position: 'relative',
    };

    const tipStyles = {
      ...currentPositions.tip,
      border: '1px solid #444',
      background: 'black',
      color: '#fff',
      padding: '10px',
      boxSizing: 'border-box',
      zIndex: 100,
    };

    const arrowStyles = {
      ...currentPositions.arrow,
      position: 'absolute',
      width: '0px',
      height: '0px',
      zIndex: 101,
    };

    const tipWrapperStyles = {
      ...currentPositions.tipWrapper,
      position: 'absolute',
    };

    const tipElem = (
        <span style={tipWrapperStyles}>
            <span style={tipStyles} ref={(tip) => { this.tip = tip; }}>
                {this.props.content}
            </span>
        </span>
    );

    const arrowElem = <span style={arrowStyles} />;

    return (
        <this.props.tagName
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={wrapperStyles}
          ref={(target) => { this.target = target; }}
          className={`react-tooltip-lite ${className}`}
        >
            {this.props.children}
            {tipElem}
            {arrowElem}
        </this.props.tagName>
    );
  }
}

export default Tooltip;
