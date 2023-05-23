const Rent = require('../models/rent');

// get a list of all rents
const index = (req, res) => {
  Rent.index((error, rents) => {
    if (error) res.status(500).json({ error });
    else res.json(rents);
  });
};

// get a single rent by id
const show = (req, res) => {
  Rent.show(req.params.id, (error, rent) => {
    if (error) res.status(500).json({ error });
    else res.json(rent);
  });
};

// create a new rent
const create = (req, res) => {
  Rent.create(req.body, (error, rent) => {
    if (error) res.status(500).json({ error });
    else res.json(rent);
  });
};

// update an existing rent
const update = (req, res) => {
  Rent.update(req.params.id, req.body, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

// delete arent
const destroy = (req, res) => {
  Rent.destroy(req.params.id, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
