const bodyParser = require("body-parser");
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControler");
const {
  getCars,
  getCarById,
  editCar,
  deleteCar,
  addCar,
} = require("../controllers/carController");
const {
  getUsers,
  addUser,
  getUserById,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { checkAdmin, checkLoggedIn } = require("../middlewares/authCheck");
const { checkMail } = require("../middlewares/checks");
const router = express.Router();

const { helloWorld, date } = require("../middlewares/dates");
const { notFound } = require("../middlewares/errorHandler");

const { testSequelizeConnection } = require("../sequelize/connection");

//middlewares
router.use("/", [date], helloWorld);

router.use(bodyParser.json());

//routes
router.get("/", (req, res) => {
  res.send(
    `Hello World! Second Practice Work of NodeJS, mi name is Marcelo Agustin Lopez Ramallo`
  );
});
router.get("/testDB", async (req, res) => {
  const { ok } = await testSequelizeConnection();
  if (ok === "ok") {
    res.send(`Connection stablished with successfull`);
  } else {
    res.send(`Connection cannot by stablished`);
  }
});
//routes Users
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id",[checkLoggedIn], editUser);
router.delete("/users/:id", [checkAdmin],deleteUser);
router.post("/users", [checkMail], addUser);
//routes Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
//routes Cars
router.get("/cars", getCars);
router.get("/cars/:id", getCarById);
router.put("/cars/:id", editCar);
router.delete("/cars/:id",[checkAdmin] , deleteCar);
router.post("/cars",[checkAdmin], addCar);
//NoTFound
router.use(notFound);

//Exports
module.exports = router;
