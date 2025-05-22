const express = require('express');
// const { userValidationRules, validate } = require('../validator/validator.js');
const router = express.Router();

const locationsController = require('../controllers/locations.js');

router.get('/', locationsController.getAllLocations);
router.get('/:id', locationsController.getSingleLocation);
router.post('/', locationsController.createLocation);
// router.post('/', userValidationRules(), validate, contactsController.createContact);
router.put('/:id', locationsController.updateLocation);
router.delete('/:id', locationsController.deleteLocation);

module.exports = router;