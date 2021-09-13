// import express
const express = require('express');

// define app
const app = express();

// import body parser to parse body of request
const bodyParser = require('body-parser');

// import express session
var session = require('express-session');

// cookie parser for parsing cookies
var cookieParser = require('cookie-parser');

// import cors for removing cors error
const cors = require('cors');

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// add Helmet for extra security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// to remove cors error
app.use(cors());

app.use(cookieParser());

app.use(session({
    secret: 'cmpe_273_uber_eats_backend',
    resave: false,
    saveUninitialized: true
}));

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});