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
                <Tooltip content="Tip text here and getting longer, and longer and much much longer to go">
                    <a href="http://google.com">Some link text</a>
                </Tooltip> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras vehicula ac risus vitae pretium. Fusce ut sem lectus.
                <Tooltip content="Tip text" direction="left">
                    <a href="http://google.com">Some link text </a>
                </Tooltip>
                Proin ultrices nibh et nulla aliquet, id sagittis nunc iaculis. Duis augue ligula, vulputate at arcu accumsan, pretium porta urna.
                Morbi accumsan placerat elit, porttitor egestas diam posuere et. Cras congue ligula et pharetra pharetra.
                Morbi pulvinar arcu at placerat volutpat. Sed non eros fermentum, tincidunt neque sed, fringilla arcu.
                Quisque in porttitor lorem, et lacinia sem. Quisque facilisis hendrerit libero. Aliquam erat volutpat.
                Curabitur facilisis, justo id volutpat venenatis, lacus urna pulvinar lectus, ut imperdiet augue orci quis elit.
                Vestibulum aliquet mauris aliquam est pulvinar, ut maximus nunc faucibus.
                <Tooltip content="Tip text here and getting longer, and longer and much much longer to go">
                    <a href="http://google.com">Some link text</a>
                </Tooltip> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras vehicula ac risus vitae pretium. Fusce ut sem lectus.
                <Tooltip content="Tip text here and getting longer, and longer and much much longer to go">
                    <a href="http://google.com">Some link text </a>
                </Tooltip>
                Proin ultrices nibh et nulla aliquet, id sagittis nunc iaculis. Duis augue ligula, vulputate at arcu accumsan, pretium porta urna.
                Morbi accumsan placerat elit, porttitor egestas diam posuere et. Cras congue ligula et pharetra pharetra.
                Morbi pulvinar arcu at placerat volutpat. Sed non eros fermentum, tincidunt neque sed, fringilla arcu.
                Quisque in porttitor lorem, et lacinia sem. Quisque facilisis hendrerit libero. Aliquam erat volutpat.
                Curabitur facilisis, justo id volutpat venenatis, lacus urna pulvinar lectus, ut imperdiet augue orci quis elit.
                Vestibulum aliquet mauris aliquam est pulvinar, ut maximus nunc faucibus.
                <Tooltip content="Tip text here and getting longer, and longer and much much longer to go">
                    <a href="http://google.com">Some link text</a>
                </Tooltip>
            </section>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
