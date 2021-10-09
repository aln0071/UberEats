/* eslint no-undef: 0 */
const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = require('assert');
const server = require('../src/index');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

chai.should();
chai.use(chaiHttp);

describe('Get Countries', () => {
  it('should return list of countries', (done) => {
    chai
      .request(server)
      .get('/countries')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});

describe('Get States', () => {
  it('should return list of states in US', (done) => {
    chai
      .request(server)
      .get('/states')
      .query({ countrycode: 1 })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});

describe('Get Cities', () => {
  it('should return list of cities in California', (done) => {
    chai
      .request(server)
      .get('/cities')
      .query({ statecode: 1 })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});

describe('Login User', () => {
  it('should return user details', (done) => {
    chai
      .request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ username: 'alan@gmail.com', password: 'testtest' })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });
});
