const Open = require('../models/open');

// get a list of all data
const index = (req, res) => {
  Open.index((error, open) => {
    if (error) res.status(500).json({ error });
    else res.json(open);
  });
};

// get a single data by id
const show = (req, res) => {
  Open.show(req.params.id, (error, open) => {
    if (error) res.status(500).json({ error });
    else res.json(open);
  });
};

// create a new data
const create = (req, res) => {
  Open.create(req.body, (error, open) => {
    if (error) res.status(500).json({ error });
    else res.json(open);
  });
};

// update an existing data
const update = (req, res) => {
  Open.update(req.params.id, req.body, (error, results) => {
    if (error) res.status(500).json({ error });
    else res.sendStatus(200);
  });
};

// delete data
const destroy = (req, res) => {
  Open.destroy(req.params.id, (error, results) => {
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
