const { checkIfEmalValid } = require("../helpers/checkIfEmalValid");
const db = require("../models/index");

const { User, Car } = db;
const getUsers = (req, res, next) => {
  User.findAll({ include: Car })
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
};

const getUserById = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id } })
    .then((user) => res.status(200).send(user))
    .catch((error) => next(error));
};
const addUser = (req, res, next) => {
  try {
    if (!checkIfEmalValid(req.body.email)) {
      const error = new Error("Bad Request");
      error.status = 400;
      throw error;
    }
    User.create(req.body)
      .then((user) => res.status(200).send(`User Created`))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const editUser = (req, res, next) => {
  const id = req.params.id;
  const newUser = req.body;
  User.update(newUser, { where: { id } })
    .then((user) => res.status(200).send("User Updated"))
    .catch((error) => next(error));
};
const deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then((user) => res.status(200).send("User Destroyed"))
    .catch((error) => next(error));
};
module.exports = { getUsers, addUser, getUserById, editUser, deleteUser };
