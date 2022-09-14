const express = require("express");
const router = express.Router();
const { helloWorld, date } = require("../middlewares/dates");
const { notFound } = require("../middlewares/errorHandler");
//middlewares
router.use("/", [date], helloWorld);

//routes
router.get("/", (req, res) => {
  res.send(
    "Hello World! Second Practice Work of NodeJS, mi name is Marcelo Agustin Lopez Ramallo"
  );
});

//NoFound
router.use(notFound);
module.exports = router;
