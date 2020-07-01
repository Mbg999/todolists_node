"use strict";

const Todo = require('../models/todo');

/**
 * returns all the todo documents, paginated
 */
exports.all = (req, res)=>{
    let skip = parseInt(req.params.skip) || 0, // pagination limits
        limit = parseInt(req.params.limit) || 10;

    Todo.find()
    .skip(skip)
    .limit(limit)
    .exec((err, todoDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            data: todoDB || []
        });
    });
};

/**
 * returns all the todo documents of the auth user
 */
exports.allOfAuth = (req, res)=>{
    Todo.find({userId: req.user._id}, (err, todoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            data: todoDB || []
        });
    });
};

/**
 * find a todo document by id
 */
exports.findById = (req, res)=>{
    Todo.findById(req.params.id, (err, todoDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        if(!todoDB){
            return res.status(400).json({
                ok: false,
                error: "ToDo not found"
            });
        }

        return res.status(200).json({
            ok: true,
            data: todoDB
        });
    });
};

/**
 * returns all the todo documents of a user by his id
 */
exports.findByUserId = (req, res)=>{
    Todo.find({userId: req.params.userId}, (err, todoDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                error: err
            });
        }

        res.status(200).json({
            ok: true,
            data: todoDB || []
        });
    });
};

/**
 * Create a todo document
 */
exports.create = (req, res)=>{
    let todo = {
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description
    };

    Todo.create(todo, (err, todoDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(201).json({
            ok: true,
            data: todoDB
        });
    });
};

/**
 * update a todo document, only if the authenticated user is the owner
 */
exports.update = (req, res)=>{
    Todo.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true, // https://mongoosejs.com/docs/deprecations.html#findandmodify
    }, (err, todoDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok: true,
            data: todoDB
        });
    });
};

/**
 * delete a todo document, only if the authenticated user is the owner
 */
exports.destroy = (req, res)=>{
    Todo.findOneAndDelete({_id: req.params.id, userId: req.user._id}, {
        useFindAndModify: true, // https://mongoosejs.com/docs/deprecations.html#findandmodify
    }, (err)=>{
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
};