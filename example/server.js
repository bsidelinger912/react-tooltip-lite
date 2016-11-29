/* eslint-disable strict */

'use strict';

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '/')));

app.listen(3000, () => {
  console.log('==> 🌎  Go to http://localhost:3000');
});
