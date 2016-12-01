# React tooltip-lite

A lightweight and responsive tooltip. Currently only this is only activated by mouseover/out but we'll be adding focus and other events as needed.  Feel free to Post an [issue](https://github.com/bsidelinger912/react-tooltip-lite/issues) if you're looking to support more use cases.

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
      <td>the tip direction, defaults to up</td>
    </tr>

    <tr>
      <td>className</td>
      <td>string</td>
      <td>css class added to the rendered wrapper</td>
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
