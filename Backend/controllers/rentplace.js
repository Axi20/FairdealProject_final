const Rentplace = require('../models/rentplace');

// get a list of all data
const index = (req, res) => {
  Rentplace.index((error, rentplace) => {
    if (error) res.status(500).json({ error });
    else res.json(rentplace);
  });
};

// get a single data by id
const show = (req, res) => {
  Rentplace.show(req.params.id, (error, rentplace) => {
    if (error) res.status(500).json({ error });
    else res.json(rentplace);
  });
};

// create a new data
const create = (req, res) => {
  Rentplace.create(req.body, (error, rentplace) => {
    if (error) res.status(500).json({ error });
    else res.json(rentplace);
  });
};

// update an existing data
const update = (req, res) => {
  Rentplace.update(req.params.id, req.body, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

// delete data
const destroy = (req, res) => {
  Rentplace.destroy(req.params.id, (error, results) => {
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
