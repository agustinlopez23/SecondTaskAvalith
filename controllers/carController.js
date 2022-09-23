const db = require("../models/index");
const { Car } = db;
const getCars = (req, res, next) => {
  Car.findAll({ include: User })
    .then((cars) => res.status(200).send(cars))
    .catch((error) => next(error));
};

const getCarById = (req, res, next) => {
  const id = req.params.id;
  Car.findOne({ where: { id } })
    .then((car) => res.status(200).send(car))
    .catch((error) => next(error));
};
const addCar = (req, res, next) => {
  Car.create(req.body)
    .then((car) => res.status(200).send(`Car Created`))
    .catch((error) => next(error));
};
const editCar = (req, res, next) => {
  const id = req.params.id;
  const newCar = req.body;
  Car.update(newUser, { where: { id } })
    .then((car) => res.status(200).send("Car Updated"))
    .catch((error) => next(error));
};
const deleteCar = (req, res, next) => {
  const id = req.params.id;
  Car.destroy({ where: { id } })
    .then((car) => res.status(200).send("Car Destroyed"))
    .catch((error) => next(error));
};

module.exports = { getCars, getCarById, addCar, editCar, deleteCar };
