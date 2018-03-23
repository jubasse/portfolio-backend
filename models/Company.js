'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompanySchema = new Schema({
    name: {
        type: String,
        required: 'company_needs_name'
    },
    slug: {
        type: String,
        validate: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    location: {
        type: String,
        required: 'company_needs_location'
    },
    lat_lng: {
        type: [Number],
        index: '2d'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }
});

module.exports = mongoose.model('Company', CompanySchema);