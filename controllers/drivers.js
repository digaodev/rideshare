const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({
      greeting: 'Welcome'
    });
  },

  create(req, res) {
    Driver.create(req.body)
      .then((driver) => {
        res.send(driver);
      });
  }
};