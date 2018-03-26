'use strict';
const mongoose = require('mongoose'),
    Education = mongoose.model('Education');

/**
 * List educations
 * @param req
 * @param res
 */
exports.listAllEducations = (req, res) => {
    Education.find({}, (err, educations) => {
        err
            ? res.status(404).json({
                status: 'education_not_found',
                errors: err.errors
            })
            : res.status(200).json(educations);
    });
};

/**
 * Create an education
 * @param req
 * @param res
 */
exports.createEducation = (req, res) => {
    let education = new Education(req.body);
    education.save((err, hobby) => {
        err
            ? res.status(401).json({
                status: 'education_not_created',
                errors: err.errors
            })
            : res.status(201).json({
                status: 'education_created',
                id: hobby._id.toString()
            });
    });
};

/**
 * Showing an education
 * @param req
 * @param res
 */
exports.readEducation = (req, res) => {
    Education.findById(req.params.id, (err, education) => {
        err
            ? res.status(404).json({
                status: 'education_not_found',
                errors: err.errors
            })
            : res.status(200).json(education);
    });
};

/**
 * Updating an education
 * @param req
 * @param res
 */
exports.updateEducation = (req, res) => {
    Education.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {new: true}, err => {
        err
            ? res.status(422).json({
                status: 'education_not_updated',
                errors: err.errors
            })
            : res.status(202).json({
                status: 'education_updated'
            })
    })
};

/**
 * Deleting an education
 * @param req
 * @param res
 */
exports.deleteEducation = (req, res) => {
    Education.remove({
        _id: req.params.id
    }, (err, education) => {
        err
            ? res.status(403).json({
                status: 'education_not_deleted',
                errors: err.errors
            })
            : res.status(202).send({
                status: 'education_deleted'
            });
    });
};