const mongoose = require('mongoose');

const mongodb = async () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = mongodb;
