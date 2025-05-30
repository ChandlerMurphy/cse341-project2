const express = require('express');
const validation = require('../middleware/validator.js')
const { isAuthenticated } = require('../middleware/authenticate.js');
const router = express.Router();

const locationsController = require('../controllers/locations.js');

router.get('/', locationsController.getAllLocations);
router.get('/:id', locationsController.getSingleLocation);
// router.post('/', validation.saveLocation, locationsController.createLocation);
// router.put('/:id', validation.saveLocation, locationsController.updateLocation);
// router.delete('/:id', locationsController.deleteLocation);
router.post('/', isAuthenticated, validation.saveLocation, locationsController.createLocation);
router.put('/:id', isAuthenticated, validation.saveLocation, locationsController.updateLocation);
router.delete('/:id', isAuthenticated, locationsController.deleteLocation);

module.exports = router;