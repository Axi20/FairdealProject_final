const express = require('express');
const router = express.Router();
const rentplaceController = require('../controllers/rentplace');

// GET /open
router.get('/', rentplaceController.index);

// GET /open/:id
router.get('/:id', rentplaceController.show);

// POST /open
router.post('/', rentplaceController.create);

// PUT
router.put('/:id', rentplaceController.update);

// DELETE /open/:id
router.delete('/:id', rentplaceController.destroy);

module.exports = router;