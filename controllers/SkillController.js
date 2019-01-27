'use strict';
const mongoose = require('mongoose'),
    Skill = mongoose.model('Skill');
/**
 * List all skills
 * @param req
 * @param res
 */
exports.listAllSkills = (req, res) => {
    Skill.find({}, (err, data) => {
        err
        ? res.status(404).json({
            error: 'skills_not_found',
            resource: 'skill',
            errors: err.errors
        })
        : res.status(200).json({
             status: 'skills_found',
            resource: 'skill',
             data
        });
    })
};

/**
 * Create a new skill
 * @param req
 * @param res
 */
exports.createSkill = (req, res) => {
    let skill = new Skill(req.body);
    skill.save((err, data) => {
        err
        ? res.status(401).json({
            error: 'skill_not_created',
            resource: 'skill',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'skill_created',
            resource: 'skill',
            _id: data._id.toString(),
            data
        });
    });
};

/**
 * Show a skill
 * @param req
 * @param res
 */
exports.readSkill = (req, res) => {
    const _id = req.params.id.toString();
    Skill.findById(_id, (err, data) => {
        err
        ? res.status(404).json({
            error: 'skill_not_found',
            resource: 'skill',
            _id,
            errors: err.errors
        })
        : res.status(200).json({
            status: 'skill_found',
            resource: 'skill',
            _id,
            data
        });
    });
};

/**
 * Update a skill
 * @param req
 * @param res
 */
exports.updateSkill = (req, res) => {
    const _id = req.params.id.toString();
    Skill.findOneAndUpdate({
        _id
    }, { $set: req.body }, {new: true}, (err, data) => {
        err
        ? res.status(422).json({
            error: 'skill_not_updated',
            resource: 'skill',
            _id,
            errors: err.errors
        })
        : res.status(202).json({
            status: 'skill_updated',
            resource: 'skill',
            _id,
            data
        })
    })
};

/**
 * Delete a skill
 * @param req
 * @param res
 */
exports.deleteSkill = (req, res) => {
    const _id = req.params.id.toString();
    Skill.remove({
        _id
    }, err => {
        err
        ? res.status(403).json({
            error: 'skill_not_deleted',
            resource: 'skill',
            _id,
            errors: err.errors
        })
        : res.status(202).send({
            status: 'skill_deleted',
            resource: 'skill',
            _id
        });
    });
};