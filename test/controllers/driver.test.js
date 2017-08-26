const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

describe('The Drivers Controller', () => {
  it('should handle a POST request to /api/drivers to create a new driver', (done) => {

    let emailDriver = 'testdriver@testdriver.com';

    request(app)
      .post('/api/drivers')
      .send({
        email: emailDriver
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);

        Driver.findOne({
            email: emailDriver
          })
          .then((driver) => {
            expect(driver.email).to.equal('testdriver@testdriver.com');
            done();
          });

      });
  });

  it('should handle a PUT request to /api/drivers/:id to update an existing driver', (done) => {

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
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);

          Driver.findOne({
              email: 'testupdatedriver@testdriver.com'
            })
            .then((driver) => { 
              expect(driver.driving).to.be.true;
              done();
            });
        });
    });
  });

  it('should handle a DELETE request to /api/drivers/:id to delete an existing driver', (done) => {

    var driver = new Driver({
      email: 'testdeletedriver@testdriver.com'
    });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);

          Driver.findOne({
              email: 'testdeletedriver@testdriver.com'
            })
            .then((driver) => {
              expect(driver).to.be.null;
              done();
            });
        });
    });
  });



});