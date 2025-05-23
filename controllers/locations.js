const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllLocations = async (req, res) => {
    //#swagger.tags=['Locations']
    mongodb
        .getDatabase()
        .db('project2')
        .collection('locations')
        .find()
        .toArray((err,lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });

    // try {
    //     const result = await mongodb.getDatabase().db('project2').collection('locations').find();
    //     result.toArray().then((locations) => {
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(locations);
    //     });
    // } catch {
    //     console.error('Error fetching all locations:', error);
    //     res.status(500).json({ message: 'An error occurred while retrieving locations.' });
    // }
};

const getSingleLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    const locationId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('locations')
        .find({ _id: locationId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        })
        
    // try {
    //     const locationId = new ObjectId(req.params.id);
    //     const result = await mongodb.getDatabase().db('project2').collection('locations').find({ _id: locationId });
    //     result.toArray().then((locations) => {
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(locations[0]);
    //     });
    // } catch {
    //     console.error('Error fetching location by ID:', error);
    //     res.status(500).json({ message: 'An error occurred while retrieving the location.' });
    // }
};

const createLocation = async (req, res) => {
    //#swagger.tags=['Locations']
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
};

const updateLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    const locationID = new ObjectId(req.params.id);
    const location = {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        size: req.body.size
    };
    const response = await mongodb.getDatabase().db('project2').collection('locations').replaceOne({ _id: locationID }, location);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    };
};

const deleteLocation = async (req, res) => {
    //#swagger.tags=['Locations']
    const locationID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('locations').deleteOne({ _id: locationID });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    };
};

module.exports = {
    getAllLocations, 
    getSingleLocation,
    createLocation,
    updateLocation,
    deleteLocation
};