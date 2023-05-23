const express = require('express');
const router = express.Router();
const Customers = require('../controllers/allUser');

// GET /customers
router.get('/', Customers.index);

// GET /customers/:id
router.get('/:id', Customers.show);

// POST /customers
router.post('/', Customers.create);

// PUT
router.put('/:id', Customers.update);

// DELETE /customers/:id
router.delete('/:id', Customers.destroy);

module.exports = router;