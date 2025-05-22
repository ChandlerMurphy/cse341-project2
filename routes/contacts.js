const express = require('express');
// const { userValidationRules, validate } = require('../validator/validator.js');
const router = express.Router();

const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
// router.post('/', userValidationRules(), validate, contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;