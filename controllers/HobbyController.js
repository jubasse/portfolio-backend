'use strict';
const mongoose = require('mongoose'),
    Hobby = mongoose.model('Hobby');

/**
 * List all the hobbies
 * @param req
 * @param res
 */
exports.listAllHobbies = (req, res) => {
    Hobby.find({}, (err, hobbies) => {
        err
        ? res.status(404).json({
            status: 'hobby_not_found',
            errors: err.errors
        })
        : res.status(200).json(hobbies);
    })
};

/**
 * Create a new hobby
 * @param req
 * @param res
 */
exports.createHobby = (req, res) => {
    let hobby = new Hobby(req.body);
    hobby.save((err, hobby) => {
        err
        ? res.status(401).json({
            status: 'hobby_not_created',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'hobby_created',
            id: hobby._id.toString()
        });
    });
};

/**
 * Show a hobby
 * @param req
 * @param res
 */
exports.readHobby = (req, res) => {
    Hobby.findById(req.params.id, (err, hobby) => {
        err
        ? res.status(404).json({
            status: 'hobby_not_found',
            errors: err.errors
        })
        : res.status(200).json(hobby);
    });
};

/**
 * Update a hobby
 * @param req
 * @param res
 */
exports.updateHobby = (req, res) => {
    Hobby.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {new: true}, err => {
        err
        ? res.status(422).json({
            status: 'hobby_not_updated',
            errors: err.errors
        })
        : res.status(202).json({
            status: 'hobby_updated'
        })
    })
};

/**
 * Delete a hobby
 * @param req
 * @param res
 */
exports.deleteHobby = (req, res) => {
    Hobby.remove({
        _id: req.params.id
    }, (err, hobby) => {
        err
        ? res.status(403).json({
            status: 'hobby_not_deleted',
            errors: err.errors
        })
        : res.status(202).send({
            status: 'hobby_deleted'
        });
    });
};