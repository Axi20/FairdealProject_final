const Car = require('../models/cars');

// get a list of all cars
const index = (req, res) => {
  Car.index((error, cars) => {
    if (error) res.status(500).json({ error });
    else res.json(cars);
  });
};

const indexCar = (req, res) => {
  Car.indexCar((error, car) => {
    if (error) res.status(500).json({ error });
    else res.json(car);
  });
};

// get a single car by id
const show = (req, res) => {
  Car.show(req.params.id, (error, car) => {
    if (error) res.status(500).json({ error });
    else res.json(car);
  });
};

// create a new car
const create = (req, res) => {
  Car.create(req.body, (error, car) => {
    if (error) res.status(500).json({ error });
    else res.json(car);
  });
};

// update an existing car
const update = (req, res) => {
  Car.update(req.params.id, req.body, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

// delete a car
const destroy = (req, res) => {
  Car.destroy(req.params.id, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

module.exports = {
  index,
  indexCar,
  show,
  create,
  update,
  destroy
};
