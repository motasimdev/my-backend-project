const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@mern2407.c7f53mh.mongodb.net/${process.env.DB_NAME}?appName=mern2407`,
    );
    console.log("DB Connect");
  } catch (error) {
    console.log(`"error" ${error}`);
  }
}

module.exports = dbConnection;
