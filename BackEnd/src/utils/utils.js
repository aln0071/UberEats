const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { pool } = require('./mysql');
const { findUserWithEmail } = require('./endpoints');

dotenv.config();

// to generate new access token
function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
}

function authWithPassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, callback) => {
      try {
        const { username } = jwtPayload;
        const user = await findUserWithEmail(username);
        if (user === null) {
          throw new Error('Invalid user');
        }
        callback(null, username);
      } catch (error) {
        callback(null, false);
      }
    }),
  );
}

const authMiddleware = passport.authenticate('jwt', { session: false });

// to verify jwt token
// function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader);
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token === null) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.SECRET, (error, user) => {
//     if (error) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//     return null;
//   });
//   return null;
// }

// to execute an sql query
function executeQuery(queryString, params = {}) {
  return new Promise((resolve, reject) => {
    if (typeof queryString !== 'string' || typeof params !== 'object') {
      reject(new Error('Query must be string and params must be object'));
    }
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      // for object to query mapping
      connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        const q = query.replace(/:(\w+)/g, (txt, key) => {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        });
        console.log(q);
        return q;
      };

      connection.query(queryString, params, (err, rows) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function paramsToQuery(params) {
  return Object.keys(params).reduce((t, c) => {
    if ([undefined, null].includes(params[c])) {
      return t;
    }
    if (t === '') {
      return `${c} = :${c}`;
    }
    return `${t}, ${c} = :${c}`;
  }, '');
}

function optionalFields(params, prefix = '') {
  return Object.keys(params).reduce((t, c) => {
    if ([undefined, null].includes(params[c])) {
      return t;
    }
    if (t === '') {
      return `${prefix}${c}`;
    }
    return `${t}, ${prefix}${c}`;
  }, '');
}

// for where conditions
function optionalConditions(params) {
  return Object.keys(params).reduce((t, c) => {
    if ([undefined, null, ''].includes(params[c])) {
      return t;
    }
    return `${t} and ${c} = :${c}`;
  }, '');
}

function getCurrentDateTime() {
  const now = new Date();
  const result = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return result;
}

module.exports = {
  generateAccessToken,
  authMiddleware,
  executeQuery,
  paramsToQuery,
  optionalFields,
  optionalConditions,
  getCurrentDateTime,
  authWithPassport,
};
