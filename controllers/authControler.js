const { checkIfEmalValid } = require("../helpers/checkIfEmalValid");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = db;
require("dotenv").config();

const registerUser = (req, res, next) => {
  const { firstName, lastName, email, password, carsPurchased, isAdmin } =
    req.body;

  try {
    if (!checkIfEmalValid(req.body.email)) {
      const error = new Error("Bad Request");
      error.status = 400;
      throw error;
    }
    User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      carsPurchased,
      isAdmin,
    })
      .then((user) => res.status(200).send(`User Registered`))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      return res.status(404)
        .send({
          ok: false,
          error: { message: "the user or password are wrong" },
        });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(200)
        .send({
          ok: false,
          error: { message: "the user or password are wrong" },
        });
    }
    if (bcrypt.compareSync(password, user.password)) {
      
      let token = jwt.sign( {
        id: user.id,
        email: user.email,
        isAdmin:user.isAdmin
    } , process.env.SEED_AUTHENTICATION, {
        expiresIn: process.env.TOKEN_EXP,
      });
      console.log(user)
      res.status(200).send({ ok: true, user, token: token });
    }
  } catch (errr) {
    const error = new Error("FAIL LOGIN(400)");
    error.status = 400;
    next(errr);
  }
};

//En el caso que se encuentre el usuario:

module.exports = { registerUser, loginUser };
