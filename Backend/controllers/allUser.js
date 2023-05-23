const Customers = require('../models/allUser');

// get a list of all data
const index = (req, res) => {
  Customers.index((error, customer) => {
    if (error) res.status(500).json({ error });
    else res.json(customer);
  });
};

// get a single data by id
const show = (req, res) => {
  Customers.show(req.params.id, (error, customer) => {
    if (error) res.status(500).json({ error });
    else res.json(customer);
  });
};

// create a new data
const create = (req, res) => {
  Customers.create(req.body, (error, customer) => {
    if (error) res.status(500).json({ error });
    else res.json(customer);
  });
};

// update an existing data
const update = (req, res) => {
  Customers.update(req.params.id, req.body, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

// delete data
const destroy = (req, res) => {
  Customers.destroy(req.params.id, (error, results) => {
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
