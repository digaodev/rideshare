const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('The Express App', () => {
  it('should handle a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.body.greeting).to.equal('Welcome');
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});