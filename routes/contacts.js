const express = require('express');
const validation = require('../middleware/validator.js')
const router = express.Router();

const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
// router.post('/', contactsController.createContact);
router.post('/', validation.saveContact, contactsController.createContact)
// router.put('/:id', contactsController.updateContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;