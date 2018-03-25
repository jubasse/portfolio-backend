'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HobbySchema = new Schema({
    name: {
        type: String,
        required: 'hobby_needs_name'
    },
    slug: {
        type: String,
        validate: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    description: {
        type: String,
        required: 'skill_needs_description'
    },
    active: {
        type: Boolean,
        default: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    medias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }]
});

module.exports = mongoose.model('Hobby', HobbySchema);