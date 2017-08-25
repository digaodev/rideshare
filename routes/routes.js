const DriversController = require('../controllers/drivers');

module.exports = (app) => {

  app.get('/api', DriversController.greeting);

  app.post('/api/drivers', DriversController.create);
  
};