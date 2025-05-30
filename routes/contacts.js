const express = require('express');
const validation = require('../middleware/validator.js');
const { isAuthenticated } = require('../middleware/authenticate.js');
const router = express.Router();

const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
// router.post('/', validation.saveContact, contactsController.createContact)
// router.put('/:id', validation.saveContact, contactsController.updateContact);
// router.delete('/:id', contactsController.deleteContact);
router.post('/', isAuthenticated, validation.saveContact, contactsController.createContact)
router.put('/:id', isAuthenticated, validation.saveContact, contactsController.updateContact);
router.delete('/:id', isAuthenticated, contactsController.deleteContact);

module.exports = router;