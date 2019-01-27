'use strict';
const mongoose = require('mongoose'),
    Hobby = mongoose.model('Hobby');

/**
 * List all the hobbies
 * @param req
 * @param res
 */
exports.listAllHobbies = (req, res) => {
    Hobby.find({}, (err, data) => {
        err
        ? res.status(404).json({
            error: 'hobbies_not_found',
            resource: 'hobby',
            errors: err.errors
        })
        : res.status(200).json({
            status: 'hobbies_found',
            resource: 'hobby',
            data
        });
    })
};

/**
 * Create a new hobby
 * @param req
 * @param res
 */
exports.createHobby = (req, res) => {
    let hobby = new Hobby(req.body);
    hobby.save((err, data) => {
        err
        ? res.status(401).json({
            status: 'hobby_not_created',
            resource: 'hobby',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'hobby_created',
            resource: 'hobby',
            _id: data._id.toString(),
            data
        });
    });
};

/**
 * Show a hobby
 * @param req
 * @param res
 */
exports.readHobby = (req, res) => {
    const _id = req.params.id.toString();
    Hobby.findById(_id, (err, data) => {
        err
        ? res.status(404).json({
            status: 'hobby_not_found',
            resource: 'hobby',
            _id,
            errors: err.errors
        })
        : res.status(200).json({
            status: 'hobby_found',
            resource: 'hobby',
            _id,
            data
        });
    });
};

/**
 * Update a hobby
 * @param req
 * @param res
 */
exports.updateHobby = (req, res) => {
    const _id = req.params.id.toString();
    Hobby.findOneAndUpdate({
        _id
    }, req.body, {new: true}, (err, data) => {
        err
        ? res.status(422).json({
            status: 'hobby_not_updated',
            resource: 'hobby',
            _id,
            errors: err.errors
        })
        : res.status(202).json({
            status: 'hobby_updated',
            resource: 'hobby',
            _id,
            data
        })
    })
};

/**
 * Delete a hobby
 * @param req
 * @param res
 */
exports.deleteHobby = (req, res) => {
    const _id = req.params.id.toString();
    Hobby.remove({
        _id
    }, err => {
        err
        ? res.status(403).json({
            error: 'hobby_not_deleted',
            resource: 'hobby',
            _id,
            errors: err.errors
        })
        : res.status(202).send({
            status: 'hobby_deleted',
            resource: 'hobby',
            _id
        });
    });
};