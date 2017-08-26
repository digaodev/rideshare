const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/rideshare_test', { useMongoClient: true });

  mongoose.connection
  .once('open', () => done())
  .on('error', (err) => {
    console.log(err);
  })
});

beforeEach((done) => {
const { drivers  } = mongoose.connection.collections;

drivers.drop()
.then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
.then(() => done())
.catch(() => done());

});