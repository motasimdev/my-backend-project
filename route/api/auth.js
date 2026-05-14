const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send({
    name: "motasim",
    email: "e@gmai.com",
    number: 22344,
  });
});

module.exports = router;
