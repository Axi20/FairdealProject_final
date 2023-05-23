const express = require('express');
const router = express.Router();
const rentsController = require('../controllers/rents');

// GET /rents
router.get('/', rentsController.index);

// GET /rents/:id
router.get('/:id', rentsController.show);

// POST /rents
router.post('/rents', rentsController.create);

// PUT
router.put('/:id', rentsController.update);

// DELETE /rents/:id
router.delete('/:id', rentsController.destroy);

module.exports = router;