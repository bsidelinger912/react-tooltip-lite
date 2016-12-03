/**
 * @class Portal
 * @description a portal element that puts the tooltip contents at the top of the document tree, outside the react app
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

let instanceCounter = 0;

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor() {
    super();

    this.portalElement = null;
  }

  componentDidMount() {
    // generate a unique ID
    instanceCounter += 1;
    const portalId = `react-tooltip-lite-instace-${instanceCounter}`;

    let el = document.getElementById(portalId);

    // add the div to the body if not there.
    if (!el) {
      el = document.createElement('div');
      el.id = portalId;
      document.body.appendChild(el);
    }

    this.portalElement = el;
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    ReactDOM.render(<div className={this.props.className}>{this.props.children}</div>, this.portalElement);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }

  render() {
    return null;
  }
}

export default Portal;
