const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

describe('The Drivers Controller', () => {
  it('handles a POST request to /api/drivers to create a new driver', (done) => {
    
    let emailDriver = 'testdriver@testdriver.com';

    request(app)
      .post('/api/drivers')
      .send({ email: emailDriver })
      .end((err, res) => {
        if (err) console.log(err);

        Driver.findOne({ email: emailDriver })
        .then((driver) => {
          assert(driver.email === 'testdriver@testdriver.com');
          done();
        });
        
      });
  });
});