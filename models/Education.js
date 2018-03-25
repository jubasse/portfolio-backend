'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    name: {
        type: String,
        required: 'experience_needs_name'
    },
    slug: {
        type: String,
        validate: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    description: {
        type: String,
        required: 'skill_needs_description'
    },
    current: {
        type: Boolean,
        default: false
    },
    start_date: {
        type: Date,
        required: 'experience_needs_start_date'
    },
    end_date: {
        type: Date,
        required: () => !this.current
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
    }],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    }
});

module.exports = mongoose.model('Education', EducationSchema);