const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({
      greeting: 'Welcome'
    });
  },


  index(req, res, next) {
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);

    Driver.geoNear({
        type: 'Point',
        coordinates: [lng, lat]
      }, {
        spherical: true,
        maxDistance: 2000
      })
      .then((drivers) => {
        res.status(200).send(drivers);
      })
      .catch(next);
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => {
        res.status(201).send(driver);
      })
      .catch(next);
  },

  update(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndUpdate({
        _id: driverId
      }, req.body)
      .then(() => Driver.findById({
        _id: driverId
      }))
      .then((driver) => res.status(200).send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({
        _id: driverId
      })
      .then((driver) => res.status(200).send(driver))
      .catch(next);
  }
};