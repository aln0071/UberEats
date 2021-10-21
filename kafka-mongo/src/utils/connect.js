const mongoose = require('mongoose');

// import mongodb configurations
const config = require('./config');

// connect to mongo
async function connect() {
  return mongoose.connect(config.connectionURL, config.options, (err, res) => {
    if (err) {
      console.log(err);
      console.log('MongoDB Connection Failed');
    } else {
      console.log(res);
      console.log('MongoDB Connected');
    }
  });
}

module.exports = connect;
