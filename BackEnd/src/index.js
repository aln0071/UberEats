// import express
const express = require('express');
const path = require('path');

// import graphql
const { graphqlHTTP } = require('express-graphql');
// import graphql schema

// create unlink function - remove local copy of images
const fs = require('fs');
const util = require('util');

const unlink = util.promisify(fs.unlink);

// define app
const app = express();
const passport = require('passport');

app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// add dotenv
const dotenv = require('dotenv');

dotenv.config();

const multer = require('multer');

const upload = multer({ dest: 'src/uploads/' });

// import body parser to parse body of request
const bodyParser = require('body-parser');

// import cors for removing cors error
const cors = require('cors');

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');
const schema = require('./schema');
const {
  generateAccessToken,
  authMiddleware,
  authWithPassport,
} = require('./utils/utils');

const {
  login,
  register,
  getCountries,
  getStates,
  getCities,
  updateProfile,
  addDish,
  getAllDishes,
  getAllRestaurants,
  getAllRelatedAddresses,
  placeOrder,
  getOrderList,
  updateOrder,
  toggleFavorite,
  getFavorites,
  updateDish,
  deleteDish,
} = require('./utils/endpoints');

// import s3 uploader function
const { uploadFile, getFileStream } = require('./utils/s3');

// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }];

// add graphql to express
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  formatError: (err) => ({ message: err.message }),
}));

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

app.post('/register', async (req, res) => {
  try {
    await register(req.body);
    res.status(200).send({
      status: true,
      message:
        req.body.type === 'c'
          ? 'User registered successfully'
          : 'Restaurant registered successfully',
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.get('/countries', async (req, res) => {
  try {
    const countrylist = await getCountries();
    res.json(countrylist);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: 'Failed to fetch',
    });
  }
});

app.get('/states', async (req, res) => {
  try {
    const statelist = await getStates(req.query.countrycode);
    res.json(statelist);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: 'Failed to fetch',
    });
  }
});

app.get('/cities', async (req, res) => {
  try {
    const citylist = await getCities(req.query.statecode);
    res.json(citylist);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: 'Failed to fetch',
    });
  }
});

app.post('/update-profile', upload.array('image', 5), async (req, res) => {
  try {
    const pictures = JSON.parse(req.body.pictures) || [];
    const uploadedFiles = await Promise.all(
      req.files.map((file) => uploadFile(file)),
    );
    await Promise.all(req.files.map((file) => unlink(file.path)));
    const response = await updateProfile({
      ...req.body,
      // pictures: req.files.map((file) => file.filename),
      pictures: [...pictures, ...uploadedFiles.map((file) => file.key)],
    });
    res.status(200).send({
      status: true,
      message: 'Profile updated successfully',
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message:
        error.code === 'ER_DUP_ENTRY'
          ? 'User with this email already exists'
          : error.message,
    });
  }
});

app.post('/update-dishes', authMiddleware, async (req, res) => {
  try {
    await updateDish(req.body);
    res.status(200).send({
      status: true,
      message: 'Dishes updated successfully',
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.post(
  '/update-dish',
  authMiddleware,
  upload.array('image', 12),
  async (req, res) => {
    try {
      const uploadedFiles = await Promise.all(
        req.files.map((file) => uploadFile(file)),
      );
      await Promise.all(req.files.map((file) => unlink(file.path)));
      await updateDish({
        ...req.body,
        pictures: uploadedFiles.map((file) => file.key),
      });
      res.status(200).send({
        status: true,
        message: 'Dish updated successfully',
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  },
);

app.post(
  '/add-dish',
  authMiddleware,
  upload.array('image', 12),
  async (req, res) => {
    try {
      const uploadedFiles = await Promise.all(
        req.files.map((file) => uploadFile(file)),
      );
      await Promise.all(req.files.map((file) => unlink(file.path)));
      await addDish({
        ...req.body,
        pictures: uploadedFiles.map((file) => file.key),
      });
      res.status(200).send({
        status: true,
        message: 'Dish added successfully',
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  },
);

app.get('/get-dishes', authMiddleware, async (req, res) => {
  try {
    const dishList = await getAllDishes(req.query.restaurantid);
    res.json(dishList);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.get('/get-restaurants', authMiddleware, async (req, res) => {
  try {
    console.log(req.query);
    const restaurantList = await getAllRestaurants(req.query);
    res.json(
      restaurantList.map((restaurant) => {
        delete restaurant.password;
        return restaurant;
      }),
    );
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.post('/images', upload.array('image', 12), async (req, res) => {
  console.log(req.body.username);
  const { files } = req;
  const uploadedFiles = await Promise.all(
    files.map((file) => uploadFile(file)),
  );
  await Promise.all(files.map((file) => unlink(file.path)));
  res.send(uploadedFiles.map((file) => file.key));
});

// get image from s3
app.get('/images/:key', async (req, res) => {
  const { key } = req.params;
  const readStream = await getFileStream(key);
  readStream.on('error', (error) => {
    res.json({
      error: error.message,
    });
    res.end();
  });
  return readStream.pipe(res);
});

app.get('/related-addresses', authMiddleware, async (req, res) => {
  const { userid } = req.query;
  try {
    const response = await getAllRelatedAddresses(userid);
    res.json(response);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.post('/place-order', authMiddleware, async (req, res) => {
  try {
    const response = await placeOrder(req.body);
    res.status(200).send({
      status: true,
      message: 'Order placed successfully',
      orderid: response,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.get('/get-orders', authMiddleware, async (req, res) => {
  const {
    userid, type, index, offset,
  } = req.query;
  try {
    const response = await getOrderList(userid, type, index, offset);
    // const orders = response[0].map((order) => ({
    //   ...order,
    //   orderDetails: response[1].filter(
    //     (detail) => detail.orderid === order.orderid,
    //   ),
    // }));
    res.json(response);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.post('/update-order', authMiddleware, async (req, res) => {
  try {
    const response = await updateOrder(req.body);
    res.status(200).send({
      status: true,
      message: response.message,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.post('/toggle-favorite', authMiddleware, async (req, res) => {
  try {
    const response = await toggleFavorite(req.body);
    res.status(200).send({
      status: true,
      message: response.message,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.get('/get-favorites', authMiddleware, async (req, res) => {
  const { userid } = req.query;
  try {
    const response = await getFavorites(userid);
    res.json(response);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

app.delete('/delete-dish', authMiddleware, async (req, res) => {
  const { dishid } = req.query;
  try {
    const response = await deleteDish(dishid);
    res.json(response);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

authWithPassport();

// starting the server
const server = app.listen(3001, () => {
  console.log('listening on port 3001');
});

module.exports = server;
