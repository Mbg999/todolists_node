"use strict";

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User' // foreign key user._id
    },
    title: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 1000,
        required: true
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    }

}, { timestamps: true }); // createdAt, deletedAt

module.exports = mongoose.model('Todo', todoSchema);