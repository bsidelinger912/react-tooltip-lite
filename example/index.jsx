import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from '../src/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tipOpen: false };

    this.toggleTip = this.toggleTip.bind(this);
  }

  toggleTip() {
    this.setState({ tipOpen: !this.state.tipOpen });
  }

  render() {
    const { tipOpen } = this.state;
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
              t
            </Tooltip>
          </div>
        </section>

        <section>
          <h3>Compound Alignment</h3>

          <div className="flex-spread">
            <Tooltip content="you can have compound alignments" direction="right-start" className="target" distance={3} arrow={false}>
              right-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="right-end" className="target" distance={3} arrow={false}>
              right-end
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="left-start" className="target" distance={10} arrow={false}>
              left-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="left-end" className="target" distance={3} arrow={false}>
              left-end
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="up-start" className="target" distance={3} arrow={false}>
              top-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="up-end" className="target" distance={3} arrow={false}>
              top-end
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="down-start" className="target" distance={3} arrow={false}>
              down-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="down-end" className="target" distance={3} arrow={false}>
              down-end
            </Tooltip>
          </div>
          <br />
          <br />
          <div className="flex-spread">
            <Tooltip content="you can have compound alignments" direction="right-start" className="target" distance={3}>
              right-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="right-end" className="target" distance={3}>
              right-end
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="left-start" className="target" distance={10}>
              left-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="left-end" className="target" distance={3}>
              left-end
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="up-start" className="target" distance={3}>
              s
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="up-end" className="target" distance={3}>
              e
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="down-start" className="target" distance={3}>
              down-start
            </Tooltip>

            <Tooltip content="you can have compound alignments" direction="down-end" className="target" distance={3}>
              down-end
            </Tooltip>
          </div>
        </section>

        <section>
          <h3>In a paragraph</h3>
          <p>
            For <Tooltip content="Go to google" direction="right" tagName="span">
              <a href="http://google.com" target="_blank" rel="noopener noreferrer">inline text</a>
            </Tooltip>, a right or left tip works nicely. The tip will try to go the desired way and flip if there is not
            enough <Tooltip content="Go to google" direction="right" tagName="span">
              <a href="http://google.com" target="_blank" rel="noopener noreferrer">space</a>
            </Tooltip>.
            Shrink the window and see how the tip behaves when close to
            the <Tooltip content="Go to google" direction="right" tagName="span">
              <a href="http://google.com" target="_blank" rel="noopener noreferrer"> edge</a>
            </Tooltip>.
            </p>
        </section>

        <section>
          <h3>Html Contents</h3>

          <p>
            You can also have a tooltip with <Tooltip
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
            </Tooltip>.
          </p>

          <p>
            By specifying the prop &quot;tipContentHover&quot; as true, you can persist hover state when cursor is over the tip.  This allows for links
            in your tip, copying contents and other behaviors.  Here&apos;s an <Tooltip
              content={(
                <div>
                  You can copy this text, or click this <a href="https://www.npmjs.com/package/react-tooltip-lite" target="_blank" rel="noopener noreferrer">link</a>
                </div>
              )}
              direction="right"
              className="target"
              tipContentHover
            >
              example
            </Tooltip>.
          </p>
        </section>

        <section>
          <h3>Colors</h3>

          You can pass <Tooltip tagName="span" className="target" color="blue" background="red" content="The color for this is defined by props">
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

        <section>
          <h3>Wrap anything as a target</h3>
          <Tooltip content="this is lorem ipsum">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt egestas sapien quis lacinia. Praesent ut sem leo.
            Curabitur vel dolor eu nulla ultrices efficitur a ut mauris. Nulla non odio non nibh venenatis commodo non vitae magna.
            Nunc porttitor, dolor nec sodales commodo, velit elit auctor arcu, sed dapibus nibh lacus sit amet nunc.
            Phasellus enim dui, blandit sed faucibus sit amet, feugiat vel urna. Vivamus ut lacus sollicitudin, dignissim risus vel,
            iaculis leo. Donec lobortis, turpis nec pulvinar venenatis, orci nunc semper sem, nec ornare nisl nisi ut ligula. Integer
            ut tempus elit. Cras luctus, tellus id vestibulum accumsan, purus velit mattis erat, euismod tempor mauris elit eget metus.
            Vivamus interdum ex sed egestas tincidunt.
                </Tooltip>

          <div className="imageWrapper">
            <Tooltip content="you can wrap images of course too" styles={{ display: 'inline-block' }} direction="right">
              <img src="/example/reactLogo.svg" alt="react logo" />
            </Tooltip>

            <Tooltip
              content="this image is absolute positioned"
              styles={{ display: 'inline-block', position: 'absolute', top: '0', right: 0 }}
              direction="right"
              className="image2"
            >
              <img src="/example/reactLogo.svg" alt="react logo" />
            </Tooltip>
          </div>

        </section>

        <section>
          <h3>Custom events</h3>
          <p>
            <Tooltip content="this uses hover but also closes on click" className="target" tagName="span" eventOff="onClick">
              Close on click
                    </Tooltip>
          </p>

          <p>
            <Tooltip
              content="opens on a click and closes on mouse out"
              className="target"
              tagName="span"
              eventOn="onClick"
              eventOff="onMouseOut"
              useHover={false}
            >
              Open on click
            </Tooltip>
          </p>

          <p>
            <Tooltip content="this uses hover but also closes on click" className="target" tagName="span" eventToggle="onClick">
              Toggle on click
            </Tooltip>
          </p>
        </section>
        <section>
          <h3>Default styles</h3>
          <p>
            pass the {'"defaultStyles"'} prop as true to get up and running quick and easy
                </p>
          <p>
            <Tooltip content="styled with defaults" className="target" useDefaultStyles tagName="span">
              See default styles
            </Tooltip>
          </p>
        </section>
        <section>
          <h3>Controlled by props</h3>

          <button onClick={this.toggleTip}>{tipOpen ? 'close' : 'open'}</button>
          <br /><br />
          <Tooltip content="controlled by the button" isOpen={tipOpen} tagName="span" direction="down">
            click the button
          </Tooltip>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
