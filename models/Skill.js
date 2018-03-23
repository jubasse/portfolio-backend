'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SkillSchema = new Schema({
    name: {
        type: String,
        required: 'skill_needs_name'
    },
    slug: {
        type: String,
        validate: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    level: {
        type: Number,
        integer: true,
        required: 'skill_needs_level',
        default: 0,
        min: [0, 'level_greater_zero'],
        max: [100, 'level_under_hundred']
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

module.exports = mongoose.model('Skill', SkillSchema);