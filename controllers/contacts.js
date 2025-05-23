const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    // mongodb
    //     .getDatabase()
    //     .db('project2')
    //     .collection('contacts')
    //     .find()
    //     .toArray((err,lists) => {
    //         if (err) {
    //             res.status(400).json({ message: err });
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(lists);
    //     });
    
    try {
        const result = await mongodb.getDatabase().db('project2').collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    } catch {
        console.error('Error fetching all contacts:', error);
        res.status(500).json({ message: 'An error occurred while retrieving contacts.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    // const contactId = new ObjectId(req.params.id);
    // mongodb
    //     .getDatabase()
    //     .db()
    //     .collection('contacts')
    //     .find({ _id: contactId })
    //     .toArray((err, result) => {
    //         if (err) {
    //             res.status(400).json({ message: err});
    //         }
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(result[0]);
    //     })

    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
        }

        const contactId = new ObjectId(id);

        const result = await mongodb.getDatabase().db('project2').collection('contacts').find({ _id: contactId });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the contact.' });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('project2').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.')
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }

    const contactId = new ObjectId(id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('project2').collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    };
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }

    const contactId = new ObjectId(id);

    const response = await mongodb.getDatabase().db('project2').collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    };
};

module.exports = {
    getAll, 
    getSingle,
    createContact,
    updateContact,
    deleteContact
};