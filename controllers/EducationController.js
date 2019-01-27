'use strict';
const mongoose = require('mongoose'),
    Education = mongoose.model('Education');

/**
 * List educations
 * @param req
 * @param res
 */
exports.listAllEducations = (req, res) => {
    Education.find({}, (err, data) => {
        err
            ? res.status(404).json({
                error: 'educations_not_found',
                resource: 'eduction',
                errors: err.errors
            })
            : res.status(200).json({
                status: 'educations_found',
                resource: 'eduction',
                data
            });
    });
};

/**
 * Create an education
 * @param req
 * @param res
 */
exports.createEducation = (req, res) => {
    let education = new Education(req.body);
    education.save((err, data) => {
        err
            ? res.status(401).json({
                error: 'education_not_created',
                resource: 'eduction',
                errors: err.errors
            })
            : res.status(201).json({
                status: 'education_created',
                resource: 'eduction',
                _id: data._id.toString(),
                data
            });
    });
};

/**
 * Showing an education
 * @param req
 * @param res
 */
exports.readEducation = (req, res) => {
    const _id = req.params.id.toString();
    Education.findById(_id, (err, data) => {
        err
            ? res.status(404).json({
                error: 'education_not_found',
                resource: 'eduction',
                _id,
                errors: err.errors
            })
            : res.status(200).json({
                status: 'eduction_found',
                resource: 'eduction',
                _id,
                data
            });
    });
};

/**
 * Updating an education
 * @param req
 * @param res
 */
exports.updateEducation = (req, res) => {
    const _id = req.params.id.toString();
    Education.findOneAndUpdate({
        _id
    }, req.body, {new: true}, (err, data) => {
        err
            ? res.status(422).json({
                error: 'education_not_updated',
                resource: 'eduction',
                _id,
                errors: err.errors
            })
            : res.status(202).json({
                status: 'education_updated',
                resource: 'eduction',
                _id,
                data
            })
    })
};

/**
 * Deleting an education
 * @param req
 * @param res
 */
exports.deleteEducation = (req, res) => {
    const _id = req.params.id.toString();
    Education.remove({
        _id
    }, err => {
        err
            ? res.status(403).json({
                error: 'education_not_deleted',
                resource: 'eduction',
                _id,
                errors: err.errors
            })
            : res.status(202).send({
                status: 'education_deleted',
                resource: 'eduction',
                _id
            });
    });
};