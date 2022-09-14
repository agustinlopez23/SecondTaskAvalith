const express = require("express");
const router = require("./routes/router");
const app = express();
const port = 3000;
const { Sequelize } = require("sequelize");
//sequelize init
const sequelize = new Sequelize("task2", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});
//router
app.use("/", router);
//listen port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
