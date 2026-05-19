const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("dotenv").config();
const dbConnection = require("./database/dbConnection");
const User = require("./model/userSchema");
const route = require("./route");
const app = express();
const port = 3000;
app.use(express.json());

//session
app.use(
  session({
    secret: "motasimEcommerce",
    resave: false,
    saveUninitialized: true, // ২০২৬ স্ট্যান্ডার্ড অনুযায়ী false রাখা ভালো
    // store: MongoStore.create({
    //   mongoUrl: "mongodb://localhost:27017/motasimEcom", // 👈 তোমার মঙ্গোডিবি ইউআরএল দাও
    //   collectionName: "sessions", // ডাটাবেসে sessions নামে একটা টেবিল/কালেকশন তৈরি হবে
    // }),
    cookie: {
      secure: false,
      // maxAge: 24 * 60 * 60 * 1000, // কুকি ১ দিন টিকে থাকবে
    },
  }),
);
//session

// app.post("/user", (req, res) => {
//   const { name, email, password } = req.body;
//   bcrypt.hash(password, 10, function (err, hash) {
//     const user = new User({
//       name: name,
//       email: email,
//       password: hash,
//     });
//     user.save();
//   });

//   res.send("data gese");
// });

dbConnection();
app.use(route);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
