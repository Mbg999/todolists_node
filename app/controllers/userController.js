"use strict";

const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * returns all the user documents, only _id, email and username fields, paginated
 */
exports.all = (req, res) => {
    let skip = parseInt(req.params.skip) || 0, // pagination limits
        limit = parseInt(req.params.limit) || 10;

    User.find({}, "_id email username")
    .skip(skip)
    .limit(limit)
    .exec((err, users)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            data: users || []
        });
    });
}

/**
 * find a user document by id
 */
exports.findById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        if(!user){
            return res.status(400).json({
                ok: false,
                error: "User not found"
            });
        }

        return res.status(200).json({
            ok: true,
            data: user
        });
    });
    
}

/**
 * update the auth user
 */
exports.update = (req, res) => {
    let user = updatableFields(req.body);

    User.findByIdAndUpdate(req.user._id, user, {
        new: true, // return the updated object
        runValidators: true, // run the schema validators
        useFindAndModify: true, // https://mongoosejs.com/docs/deprecations.html#findandmodify
        context: 'query' // needed to use the mongoose-unique-validator validations
    }, function (err, userDB) {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Successfully updated",
            data: userDB
        });
    });
}

/**
 * delete the auth user, User deletes on cascade his ToDo documents
 */
exports.destroy = (req, res) => { 
    User.findOneAndDelete({ _id: req.user._id }, {
        useFindAndModify: true, // https://mongoosejs.com/docs/deprecations.html#findandmodify
    },(err) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Successfully deleted"
        });
    });
}

// returns the user object ready to update
function updatableFields(params){
    let user = {};
    if(params.email) user.email = params.email;
    if(params.password) user.password = bcrypt.hashSync(params.password, saltRounds);
    if(params.username) user.username = params.username;

    return user;
}