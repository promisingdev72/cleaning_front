const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions.origin));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
require('./routes/auth.routes')(app);

module.exports = app;
