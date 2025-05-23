const express = require('express');
const validation = require('../middleware/validator.js')
const router = express.Router();

const locationsController = require('../controllers/locations.js');

router.get('/', locationsController.getAllLocations);
router.get('/:id', locationsController.getSingleLocation);
// router.post('/', locationsController.createLocation);
router.post('/', validation.saveLocation, locationsController.createLocation);
// router.put('/:id', locationsController.updateLocation);
router.put('/:id', validation.saveLocation, locationsController.updateLocation);
router.delete('/:id', locationsController.deleteLocation);

module.exports = router;