import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

const useCreatePortal = typeof ReactDom.createPortal === 'function';
export const isBrowser = typeof window !== 'undefined';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    if (isBrowser) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);

      this.renderLayer();
    }
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    if (!useCreatePortal) {
      ReactDom.unmountComponentAtNode(this.container);
    }

    document.body.removeChild(this.container);
  }

  renderLayer() {
    if (!useCreatePortal) {
      ReactDom.unstable_renderSubtreeIntoContainer(this, this.props.children, this.container);
    }
  }

  render() {
    if (useCreatePortal) {
      return ReactDom.createPortal(this.props.children, this.container);
    }
    return null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
