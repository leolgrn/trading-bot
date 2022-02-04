const mongoose = require("mongoose");

module.exports = async server => {
  // MongoDB connections

  const options = {
    useNewUrlParser: true,
    authMechanism: 'SCRAM-SHA-1',
    authSource: 'admin',
    useUnifiedTopology: true
  };

  const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

  const connection = await mongoose.createConnection(uri, options).asPromise()
      .catch(err => {
        console.error(`[${err.name}] ${err.message}`);
        process.exit();
      });

  console.log("Connected to mongo database")

  server.models = {

  }
}
