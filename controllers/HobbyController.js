'use strict';
let mongoose = require('mongoose'),
    Hobby = mongoose.model('Hobby');

exports.listAllHobbies = (req, res) => {
    Hobby.find({}, (err, hobbies) => {
        err
        ? res.status(404).json({
            status: 'model_not_found',
            errors: err.errors
        })
        : res.status(200).json(hobbies);
    })
};

exports.createHobby = (req, res) => {
    let hobby = new Hobby(req.body);
    hobby.save((err, hobby) => {
        err
        ? res.status(401).json({
            status: 'model_not_created',
            errors: err.errors
        })
        : res.status(201).json({
            status: 'model_created'
        });
    });
};

exports.readHobby = (req, res) => {
    Hobby.findById(req.params.id, (err, hobby) => {
        err
        ? res.status(404).json({
            status: 'model_not_found',
            errors: err.errors
        })
        : res.status(200).json(hobby);
    });
};

exports.updateHobby = (req, res) => {
    Hobby.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {new: true}, err => {
        err
        ? res.status(422).json({
            status: 'model_not_updated',
            errors: err.errors
        })
        : res.status(202).json({
            status: 'model_updated'
        })
    })
};

exports.deleteHobby = (req, res) => {
    Hobby.remove({
        _id: req.params.id
    }, (err, hobby) => {
        err
        ? res.status(403).json({
            status: 'model_not_deleted',
            errors: err.errors
        })
        : res.status(202).send({
            status: 'model_deleted'
        });
    });
};