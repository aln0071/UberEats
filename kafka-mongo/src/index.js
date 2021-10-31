// index -> service -> api

// import express
const express = require('express');

// define app
const app = express();

// import body parser to parse body of request
const bodyParser = require('body-parser');

// import cors for removing cors error
const cors = require('cors');

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');

// add Helmet for extra security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// to remove cors error
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// connect to mongo db
const connect = require('./utils/connect');

connect();

const User = require('./models/UserModel');

const userService = require('./services/user');

// hi message
app.get('/', async (req, res) => {
  try {
    const user = await User.find({ email: 'aln0071@gmail.com' });
    res.json(user);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

// handle all requests
app.post('/request', async (req, res) => {
  const { type } = req.query;
  console.log(type);
  console.log(req.body);
  try {
    const response = await userService(type, req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      message: error.message,
    });
  }
});

// starting the server
const server = app.listen(3003, () => {
  console.log('listening on port 3002');
});

module.exports = server;
