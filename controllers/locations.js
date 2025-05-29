const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllLocations = async (req, res) => {
    //#swagger.tags=['Locations']
    try {
        const result = await mongodb.getDatabase().db('project2').collection('locations').find();
        result.toArray().then((locations) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(locations);
        });
    } catch {
        console.error('Error fetching all locations:', error);
        res.status(500).json({ message: 'An error occurred while retrieving locations.' });
    }
};

const getSingleLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid location id to find a location.');
        }

        const locationId = new ObjectId(id);

        const result = await mongodb.getDatabase().db('project2').collection('locations').find({ _id: locationId });
        result.toArray().then((locations) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(locations[0]);
        });
    } catch {
        console.error('Error fetching location by ID:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the location.' });
    }
};

const createLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    try {
        const location = {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        size: req.body.size
        };

        const response = await mongodb.getDatabase().db('project2').collection('locations').insertOne(location);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the location.')
        }
    } catch (error) {
        console.error('Error creating location: ', error);
        res.status(500).json({ message: 'An error occurred while creating the location' });
    }

};

const updateLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid location id to update a location.');
        }

        const locationId = new ObjectId(id);

        const location = {
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            size: req.body.size
        };
        const response = await mongodb.getDatabase().db('project2').collection('locations').replaceOne({ _id: locationId }, location);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the location.');
        };
    } catch (error) {
        console.error('Error updating location: ', error);
        res.status(500).json({ message: 'An error occured while updating the location'});
    }

};

const deleteLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
        res.status(400).json('Must use a valid location id to delete a location.');
        }

        const locationId = new ObjectId(id);

        const response = await mongodb.getDatabase().db('project2').collection('locations').deleteOne({ _id: locationId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the location.');
        };
    } catch (error) {
        console.error('Error deleting location: ', error);
        res.status(500).json({ message: 'An error ocurred while deleting the location'});
    }

};

module.exports = {
    getAllLocations, 
    getSingleLocation,
    createLocation,
    updateLocation,
    deleteLocation
};