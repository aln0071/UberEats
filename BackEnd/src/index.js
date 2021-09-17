// import express
const express = require('express');

// define app
const app = express();

// add dotenv
const dotenv = require('dotenv');

dotenv.config();

// import body parser to parse body of request
const bodyParser = require('body-parser');

// import cors for removing cors error
const cors = require('cors');

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');
const { generateAccessToken, authMiddleware } = require('./utils/utils');

const { login } = require('./utils/endpoints');

// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }];

// add Helmet for extra security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// to remove cors error
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  const token = generateAccessToken('test');
  res.json({ token, ...ads });
});

app.post('/auth', authMiddleware, (req, res) => {
  res.sendStatus(200);
});

app.post('/login', async (req, res) => {
  try {
    const response = await login(req.body.username, req.body.password);
    const token = generateAccessToken(req.body.username);
    res.json({
      status: true,
      token: `Bearer ${token}`,
      ...response,
    });
  } catch (error) {
    res.status(401).send({
      status: false,
      message: error.message,
    });
  }
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
