'use strict';
const mongoose = require('mongoose'),
    Experience = mongoose.model('Experience');

/**
 * List experiences
 * @param req
 * @param res
 */
exports.listAllExperiences = (req, res) => {
    Experience.find({}, (err, experiencies) => {
        err
        ? res.status(404).json({
            status: 'experience_not_found',
            errors: err.errors
        })
        : res.status(200).json(experiencies);
    });
};

/**
 * Create an experience
 * @param req
 * @param res
 */
exports.createExperience = (req, res) => {
    let experience = new Experience(req.body);
    experience.save((err, hobby) => {
        err
        ? res.status(401).json({
            status: 'experience_not_created',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'experience_created',
            id: hobby._id.toString()
        });
    });
};

/**
 * Showing an experience
 * @param req
 * @param res
 */
exports.readExperience = (req, res) => {
    Experience.findById(req.params.id, (err, experience) => {
        err
        ? res.status(404).json({
            status: 'experience_not_found',
            errors: err.errors
        })
        : res.status(200).json(experience);
    });
};

/**
 * Updating an experience
 * @param req
 * @param res
 */
exports.updateExperience = (req, res) => {
    Experience.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {new: true}, err => {
        err
        ? res.status(422).json({
            status: 'experience_not_updated',
            errors: err.errors
        })
        : res.status(202).json({
            status: 'experience_updated'
        })
    })
};

/**
 * Deleting an experience
 * @param req
 * @param res
 */
exports.deleteExperience = (req, res) => {
    Experience.remove({
        _id: req.params.id
    }, (err, experience) => {
        err
        ? res.status(403).json({
            status: 'experience_not_deleted',
            errors: err.errors
        })
        : res.status(202).send({
            status: 'experience_deleted'
        });
    });
};