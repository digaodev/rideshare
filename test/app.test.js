const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        expect(res.body.greeting).to.equal('Welcome');
        done();
      });
  });
});