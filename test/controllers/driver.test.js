const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

describe('The Drivers Controller', () => {

  it('should handle a GET request to /api/drivers to find all drivers near a location', (done) => {

    const clientLocation = {
      lng: -46.657816,
      lat: -23.560250
    };

    let paulistaDriver = new Driver({
      email: 'paulistadriver@testdriver.com',
      geometry: {
        type: 'Point',
        coordinates: [-46.6542503, -23.5632103]
      }
    });

    let augustaDriver = new Driver({
      email: 'augustadriver@testdriver.com',
      geometry: {
        type: 'Point',
        coordinates: [-46.666586, -23.564161]
      }
    });

    Promise.all([paulistaDriver.save(), augustaDriver.save()]);

    request(app)
      .get('/api/drivers')
      .query({
        lng: clientLocation.lng
      })
      .query({
        lat: clientLocation.lat
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => expect(res.body.length).to.equal(2))
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

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