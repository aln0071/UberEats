// import express
const express = require('express');
const path = require('path');

// define app
const app = express();
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

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');
const { generateAccessToken, authMiddleware } = require('./utils/utils');

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
} = require('./utils/endpoints');

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
  const pictures = JSON.parse(req.body.pictures);
  try {
    await updateProfile({
      ...req.body,
      pictures: JSON.stringify([
        ...pictures,
        ...req.files.map((file) => file.filename),
      ]),
    });
    res.status(200).send({
      status: true,
      message: 'Profile updated successfully',
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

app.post('/update-dishes', async (req, res) => {
  try {
    await addDish(req.body);
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

app.post('/add-dish', upload.array('image', 12), async (req, res) => {
  try {
    await addDish({
      ...req.body,
      pictures: JSON.stringify(req.files.map((file) => file.filename)),
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
});

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

app.post('/images', upload.array('image', 12), (req, res) => {
  console.log(req.body.username);
  const { files } = req;
  console.log(files);
  res.send('got it!');
});

app.get('/related-addresses', async (req, res) => {
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

app.post('/place-order', async (req, res) => {
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
  res.status(200).send();
});

app.get('/get-orders', async (req, res) => {
  const { userid, type } = req.query;
  try {
    const response = await getOrderList(userid, type);
    const orders = response[0].map((order) => ({
      ...order,
      orderDetails: response[1].filter(
        (detail) => detail.orderid === order.orderid,
      ),
    }));
    res.json(orders);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
