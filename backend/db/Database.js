const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Mongodb uri: ", process.env.MONGODB_URI);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
