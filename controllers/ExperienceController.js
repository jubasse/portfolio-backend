'use strict';
const mongoose = require('mongoose'),
    Experience = mongoose.model('Experience');

/**
 * List experiences
 * @param req
 * @param res
 */
exports.listAllExperiences = (req, res) => {
    Experience.find({}, (err, data) => {
        err
        ? res.status(404).json({
            error: 'experiences_not_found',
            resource: 'experience',
            errors: err.errors
        })
        : res.status(200).json({
            status: 'experiences_found',
            resource: 'experience',
            data
        });
    });
};

/**
 * Create an experience
 * @param req
 * @param res
 */
exports.createExperience = (req, res) => {
    let experience = new Experience(req.body);
    experience.save((err, data) => {
        err
        ? res.status(401).json({
            error: 'experience_not_created',
            resource: 'experience',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'experience_created',
            resource: 'experience',
            _id: data._id.toString(),
            data
        });
    });
};

/**
 * Showing an experience
 * @param req
 * @param res
 */
exports.readExperience = (req, res) => {
    const _id = req.params.id.toString();
    Experience.findById(_id, (err, data) => {
        err
        ? res.status(404).json({
            error: 'experience_not_found',
            resource: 'experience',
            _id,
            errors: err.errors
        })
        : res.status(200).json({
            status: 'experience_not_found',
            resource: 'experience',
            _id,
            data
        });
    });
};

/**
 * Updating an experience
 * @param req
 * @param res
 */
exports.updateExperience = (req, res) => {
    const _id = req.params.id.toString();
    Experience.findOneAndUpdate({
        _id
    }, req.body, {new: true}, (err, data) => {
        err
        ? res.status(422).json({
            status: 'experience_not_updated',
            resource: 'experience',
            errors: err.errors
        })
        : res.status(202).json({
            status: 'experience_updated',
            resource: 'experience',
            _id,
            data
        })
    })
};

/**
 * Deleting an experience
 * @param req
 * @param res
 */
exports.deleteExperience = (req, res) => {
    const _id = req.params.id.toString();
    Experience.remove({
        _id
    }, err => {
        err
        ? res.status(403).json({
            error: 'experience_not_deleted',
            resource: 'experience',
            _id,
            errors: err.errors
        })
        : res.status(202).send({
            status: 'experience_deleted',
            resource: 'experience',
            _id,
        });
    });
};