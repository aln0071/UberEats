/* eslint no-undef: 0 */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/index');

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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzM5MjYyNDAsImV4cCI6MTYzMzkyOTg0MH0.L6faWmR18Y5eIc0WMyoHTtVd29gHlTpuZXALqF_bizw';

describe('Get Restaurants List', () => {
  it('should return list of restaurants', (done) => {
    chai
      .request(server)
      .get('/get-restaurants')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});
