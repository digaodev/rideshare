const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({
      greeting: 'Welcome'
    });
  },


  index(req, res, next) {
    Driver.create(req.body)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => {
        res.send(driver);
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
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({
        _id: driverId
      })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  }
};