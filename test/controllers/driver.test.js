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
      .send({
        email: emailDriver
      })
      .end((err, res) => {
        if (err) console.log(err);

        Driver.findOne({
            email: emailDriver
          })
          .then((driver) => {
            assert(driver.email === 'testdriver@testdriver.com');
            done();
          });

      });
  });

  it('handles a PUT request to /api/drivers/:id to update an existing driver', (done) => {

    var driver = new Driver({
      email: 'testupdatedriver@testdriver.com',
      driving: false
    });

    driver.save().then(() => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({
        driving: true
      })
      .end((err, res) => {
        if (err) console.log(err);

        Driver.findOne({
            email: 'testupdatedriver@testdriver.com'
          })
          .then((driver) => {
            assert(driver.driving === true);
            done();
          });
      });
    } );
  });

  it('handles a DELETE request to /api/drivers/:id to delete an existing driver', (done) => {
    
        var driver = new Driver({
          email: 'testdeletedriver@testdriver.com'
        });
    
        driver.save().then(() => {
          request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err) => {
            if (err) console.log(err);
    
            Driver.findOne({
                email: 'testdeletedriver@testdriver.com'
              })
              .then((driver) => {
                assert(driver === null);
                done();
              });
          });
        } );
      });
  


});