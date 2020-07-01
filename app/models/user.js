"use strict";

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Todo = require('./todo');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        unique: true,
        uniqueCaseInsensitive: true
    }
},{ timestamps: true }); // createdAt, deletedAt

/**
 * on delete cascade, for findOneAndDelete method
 */
userSchema.post('findOneAndDelete', async function (user) {
    console.log(user._id);
    await Todo.deleteMany({userId: user._id});
});

/*
  filter sensitive user information,
  i don't want to give the password or something else to everyone
*/
userSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
}

// handling unique validator message
userSchema.plugin(uniqueValidator, {message: '{PATH} already exists'});

module.exports = mongoose.model('User', userSchema);