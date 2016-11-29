import React from 'react';

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
    const wrapperStyles = {
      position: 'relative',
    };

    const tipStyles = {
      display: 'none',
    };

    if (this.state.showTip) {
      tipStyles.display = '';
    }

    const tip = (this.props.content) ? (
        <div style={tipStyles}>{this.props.content}</div>
    ) : null;

    return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={wrapperStyles}
        >
            {this.props.children}

            {tip}
        </div>
    );
  }
}

export default Tooltip;
