const mongoose = require('mongoose');
require('dotenv')

// Don't forget to set "MONGODB_URI" in ~/server/.env
const uri = process.env.MONGODB_URI || `mongodb://localhost/please-set-process-env-mongodb-uri`;

mongoose
  .connect("mongodb://localhost/react-countries", { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });