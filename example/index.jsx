import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from '../src/';

class App extends React.Component {
  render() {
    return (
        <div className="wrapper">
            <h1>React tooltip-lite examples</h1>

            <section>
                <h3>Basic:</h3>
                <Tooltip content="Tip text here">
                    <a href="http://google.com">Some link text</a>
                </Tooltip>
            </section>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
