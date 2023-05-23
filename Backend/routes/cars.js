const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');

// GET /cars
router.get('/', carsController.index);

router.get('/car', carsController.indexCar);

// GET /cars/:id
router.get('/:id', carsController.show);

// POST /cars
router.post('/', carsController.create);

// PUT
router.put('/:id', carsController.update);

// DELETE /cars/:id
router.delete('/:id', carsController.destroy);

module.exports = router;