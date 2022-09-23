
const express = require("express");
const {errorLogger, errorParser} = require("./middlewares/errorHandler")
const router = require("./routes/router");
const app = express();
const port = 3000;



//sequelize init
//if you want to test the connection to the database you can run the test function



//router
app.use("/", router);
router.use([errorLogger,errorParser])

//listen port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
