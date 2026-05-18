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

app.use(
  session({
    secret: "motasimEcommerce",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

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
