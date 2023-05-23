const express = require('express');
const router = express.Router();
const openController = require('../controllers/open');

// GET /open
router.get('/', openController.index);

// GET /open/:id
router.get('/:id', openController.show);

// POST /open
router.post('/', openController.create);

// PUT
router.put('/:id', openController.update);

// DELETE /open/:id
router.delete('/:id', openController.destroy);

module.exports = router;