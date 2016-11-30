import React from 'react';

import { positions } from './position';

class Tooltip extends React.Component {
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
    const direction = this.props.direction || 'up';
    const currentPositions = positions(direction, this.tip, this.target, this.state);

    const wrapperStyles = {
      position: 'relative',
      display: 'inline',
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

    const tipElem = (this.props.content) ? (
        <div style={tipWrapperStyles}>
            <div style={tipStyles} ref={(tip) => { this.tip = tip; }}>
                {this.props.content}
            </div>
        </div>
    ) : null;

    const arrowElem = (this.props.content) ? (
        <div style={arrowStyles} />
    ) : null;

    return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={wrapperStyles}
          ref={(target) => { this.target = target; }}
        >
            {this.props.children}
            {tipElem}
            {arrowElem}
        </div>
    );
  }
}

export default Tooltip;
