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
  it('should return list of states', (done) => {
    chai
      .request(server)
      .get('/states')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});

describe('Get Cities', () => {
  it('should return list of cities', (done) => {
    chai
      .request(server)
      .get('/cities')
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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYW5AZ21haWwuY29tIiwiaWF0IjoxNjM2OTYxNzQ5LCJleHAiOjE2MzY5NjUzNDl9.jt2_xRRueZONo2UHATGUP-d5uYsOj-gl6TlSrjCBIso';

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
