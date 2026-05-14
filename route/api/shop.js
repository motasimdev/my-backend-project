const express = require("express");
const router = express.Router();

router.get("/product", (req, res) => {
  res.send({
    title: "gg",
    price: "1323",
    color: "black",
  });
});

module.exports = router;
