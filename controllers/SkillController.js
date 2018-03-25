'use strict';
const mongoose = require('mongoose'),
    Skill = mongoose.model('Skill');

exports.listAllSkills = (req, res) => {
    Skill.find({}, (err, skills) => {
        err
        ? res.status(404).json({
            error: 'skill_not_found'
        })
        : res.status(200).json(skills);
    })
};

exports.createSkill = (req, res) => {
    let skill = new Skill(req.body);
    skill.save((err, skill) => {
        err
        ? res.status(401).json({
            error: 'skill_not_created'
        })
        : res.status(201).json({
            status: 'skill_created'
        });
    });
};

exports.readSkill = (req, res) => {
    Skill.findById(req.params.id, (err, skill) => {
        err
        ? res.status(404).json({
            error: 'skill_not_found'
        })
        : res.status(200).json(skill);
    });
};

exports.updateSkill = (req, res) => {
    Skill.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {new: true}, err => {
        err
        ? res.status(422).json({
            error: 'skill_not_updated'
        })
        : res.status(202).json({
            status: 'skill_updated'
        })
    })
};

exports.deleteSkill = (req, res) => {
    Skill.remove({
        _id: req.params.id
    }, (err, skill) => {
        err
        ? res.status(403).json({
            error: 'skill_not_deleted'
        })
        : res.status(202).send({
            status: 'skill_deleted'
        });
    });
};