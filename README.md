# React tooltip-lite

A lightweight and responsive tooltip. Feel free to Post an [issue](https://github.com/bsidelinger912/react-tooltip-lite/issues) if you're looking to support more use cases.

## Getting started

#### 1. Install with NPM
```
$ npm install react-tooltip-lite
```
<br />

#### 2. Import into your react Component
```
import Tooltip from 'react-tooltip-lite';
```
<br />

#### 3. Wrap any element with the Tooltip component to make it a target
```
<Tooltip content="Go to google">
    <a href="http://google.com"> edge</a>
</Tooltip>
```

<br />

**CodePen demo**: [http://codepen.io/bsidelinger912/pen/WOdPNK](http://codepen.io/bsidelinger912/pen/WOdPNK)

<br />

### styling
By default you need to style react-tooltip-lite with CSS, this allows for psuedo elements and some cool border tricks, as well as using css/sass/less variables and such to keep your colors consistent. (Note: as of version 1.2.0 you can also pass the "useDefaultStyles" prop which will allow you to use react-tooltip-lite without a stylesheet.)  

Since the tooltip's arrow is created using the css border rule (https://css-tricks.com/snippets/css/css-triangle/), you'll want to specify the border-color for the arrow to set it's color. 

#### Here's an example stylesheet:

```
.react-tooltip-lite {
  background: #333;
  color: white;
}

.react-tooltip-lite-arrow {
  border-color: #333;
}
```
For more examples, see the **CodePen demo**: [http://codepen.io/bsidelinger912/pen/WOdPNK](http://codepen.io/bsidelinger912/pen/WOdPNK).

## Props
You can pass in props to define tip direction, styling, etc.  Content is the only required prop.

<table style="width: 100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>content</td>
      <td>node (text or html)</td>
      <td>the contents of your hover target</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>string</td>
      <td>html tag used for className</td>
    </tr>
    <tr>
      <td>direction</td>
      <td>string</td>
      <td>the tip direction, defaults to up.   Possible values are "up", "down", "left", "right" with optional modifer for alignment of "start" and "end".    e.g. "left-start" will attempt tooltip on left and align it with the start of the target.   If alignment modifier is not specified the default behavior is to align "middle".</td>
    </tr>
    <tr>
      <td>forceDirection</td>
      <td>boolean</td>
      <td>Tells the tip to allow itself to render out of view if there's not room for the specified direction.  If undefined or false, the tip will change direction as needed to render within the confines of the window.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>string</td>
      <td>
        css class added to the rendered wrapper (and the tooltip if tooltipClassName is undefined)
        NOTE: in future versions className will only be applied to the wrapper element and not the tooltip
      </td>
    </tr>
    <tr>
      <td>tipContentClassName</td>
      <td>string</td>
      <td>css class added to the tooltip</td>
    </tr>
    <tr>
      <td>tipContentHover</td>
      <td>boolean</td>
      <td>defines whether you should be able to hover over the tip contents for links and copying content,
        defaults to false.</a>
    </tr>
    <tr>
      <td>background</td>
      <td>string</td>
      <td>background color for the tooltip contents and arrow</td>
    </tr>
    <tr>
      <td>color</td>
      <td>string</td>
      <td>text color for the tooltip contents</td>
    </tr>
    <tr>
      <td>padding</td>
      <td>string</td>
      <td>padding amount for the tooltip contents (defaults to '10px')</td>
    </tr>
    <tr>
      <td>styles</td>
      <td>object</td>
      <td>style overrides for the target wrapper</td>
    </tr>
    <tr>
      <td>eventOn</td>
      <td>string</td>
      <td>full name of supported react event to show the tooltip, e.g.: 'onClick'</td>
    </tr>
    <tr>
      <td>eventOff</td>
      <td>string</td>
      <td>full name of supported react event to hide the tooltip, e.g.: 'onClick'</td>
    </tr>
    <tr>
      <td>eventToggle</td>
      <td>string</td>
      <td>full name of supported react event to toggle the tooltip, e.g.: 'onClick', default hover toggling is disabled when using this option</td>
    </tr>
    <tr>
      <td>useHover</td>
      <td>boolean</td>
      <td>whether to use hover to show/hide the tip, defaults to true</td>
    </tr>
    <tr>
      <td>useDefaultStyles</td>
      <td>boolean</td>
      <td>uses default colors for the tooltip, so you don't need to write any CSS for it</td>
    </tr>
    <tr>
      <td>isOpen</td>
      <td>boolean</td>
      <td>forces open/close state from a prop, overrides hover or click state</td>
    </tr>
    <tr>
      <td>hideOnScroll</td>
      <td>boolean</td>
      <td>whether to hide the tip on window scroll, defaults to false</td>
    </tr>
    <tr>
      <td>hoverDelay</td>
      <td>number</td>
      <td>the number of milliseconds to determine hover intent, defaults to 200</td>
    </tr>
    <tr>
      <td>mouseOutDelay</td>
      <td>number</td>
      <td>the number of milliseconds to determine hover-end intent, defaults to the hoverDelay value</td>
    </tr>
    <tr>
      <td>arrow</td>
      <td>boolean</td>
      <td>Whether or not to have an arrow on the tooltip, defaults to true</td>
    </tr>
    <tr>
      <td>arrowSize</td>
      <td>number</td>
      <td>Number in pixels of the size of the arrow, defaults to 10</td>
    </tr>
    <tr>
      <td>distance</td>
      <td>number</td>
      <td>The distance from the tooltip to the target, defaults to 10px with an arrow and 3px without an arrow</td>
    </tr>
  </tbody>
</table>
<br />

### Here's an example using more of the props:

```
<Tooltip
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
    Target content for big html tip
</Tooltip>
```

<br />

To see more usage examples, take look at the /example folder in the [source](https://github.com/bsidelinger912/react-tooltip-lite).
