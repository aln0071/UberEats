const mongoose = require('mongoose');
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

// import mongodb configurations
const config = require('./utils/config');

const User = require('./models/UserModel');

// async function test() {
//   await mongoose.connect(
//     'mongodb+srv://ubereats.sqgqq.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       ssl: true,
//       sslKey: 'cert.pem',
//       sslCert: 'cert.pem',
//     },
//   );
//   const Cat = mongoose.model('Cat', { name: String });

//   const kitty = new Cat({ name: 'Zildjian' });
//   kitty.save().then(() => console.log('meow'));
// }

// test();

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

connect();

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

// register user
app.post('/register', async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// register temp user
app.get('/reg', async (req, res) => {
  try {
    const user = new User({
      name: 'alan',
      email: 'aln0071@gmail.com',
      password: 'hello',
      type: 'c',
    });
    await user.save();
    res.json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// starting the server
const server = app.listen(3001, () => {
  console.log('listening on port 3001');
});

module.exports = server;

// const client = new MongoClient('mongodb+srv://ubereats.sqgqq.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//   sslKey: credentials,
//   sslCert: credentials
// });
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
