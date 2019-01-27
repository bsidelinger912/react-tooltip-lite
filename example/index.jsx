import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from '../src/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tipOpen: false };

    this.toggleTip = this.toggleTip.bind(this);
    this.bodyClick = this.bodyClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.bodyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.bodyClick);
  }

  tipContentRef;
  buttonRef;

  toggleTip() {
    this.setState({ tipOpen: !this.state.tipOpen });
  }

  bodyClick(e) {
    if (this.tipContentRef.contains(e.target) || this.buttonRef.contains(e.target)) {
      return;
    }

    this.setState({ tipOpen: false });
  }

  render() {
    const { tipOpen } = this.state;
    return (
      <div className="wrapper" style={{ width: 700 }}>
        <h1>React tooltip-lite examples</h1>

        <section>
          <h3>In a paragraph</h3>
          <p>
            You can also force the direction of the tip and it will allow itself <Tooltip isOpen className="target" content="this direction is forced" direction="right" tagName="span" forceDirection>to go off screen</Tooltip>.
          </p>
        </section>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
