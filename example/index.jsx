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

                <div className="flex-spread">
                    <Tooltip content="By default the text is above the element" className="target">
                        Target
                    </Tooltip>

                    <Tooltip content="It'll center if it has room" className="target">
                        Target
                    </Tooltip>

                    <Tooltip content="you can specify 'direction' (up, down, left, right) too" direction="down" className="target">
                        Target
                    </Tooltip>
                </div>
            </section>

            <section>
                <h3>In a paragraph</h3>
                <p>
                    For <Tooltip content="Go to google" direction="right" tagName="span">
                        <a href="http://google.com">inline text</a>
                    </Tooltip>, a right or left tip works nicely.
                    The tip will try to go the desired way and flip if there
                    is not enough <Tooltip content="Go to google" direction="right" tagName="span">
                        <a href="http://google.com">space</a>
                    </Tooltip>.
                    Shrink the window and see how the tip behaves when close to the <Tooltip content="Go to google" direction="right" tagName="span">
                        <a href="http://google.com"> edge</a>
                    </Tooltip>.
                </p>
            </section>

            <section>
                <h3>Html Contents</h3>

                You can also have a tooltip
                with <Tooltip
                  content={(
                      <div>
                          <h4 className="tip-heading">An unordered list to demo some html content</h4>
                          <ul className="tip-list">
                              <li>One</li>
                              <li>Two</li>
                              <li>Three</li>
                              <li>Four</li>
                              <li>Five</li>
                          </ul>
                      </div>
                  )}
                  direction="right"
                  tagName="span"
                  className="target"
                >
                    Html content
                </Tooltip>
            </section>

            <section>
                <h3>Colors</h3>

                You can
                pass <Tooltip tagName="span" className="target" color="blue" background="red" content="The color for this is defined by props">
                  color options as props
                </Tooltip> or use a&nbsp;
                <Tooltip
                  tagName="span"
                  className="target customTip"
                  direction="right"
                  content="The color for this tip is defined by examples/index.css"
                >
                  css stylesheet.
                </Tooltip>
            </section>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
