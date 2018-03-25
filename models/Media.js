'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    name: {
        type: String,
        required: 'media_needs_name'
    },
    url: {
        type: String,
        required: 'media_needs_url'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Media', MediaSchema);