"use strict";

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

/**
 * Register a user, it also returns a jwt token
 */
exports.register = (req, res) => { 
    let user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        username: req.body.username
    }

    User.create(user, (err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        delete userDB.password;
        let token = jwt.sign({
            user: userDB // payload
        }, process.env.SEED, // sign
            { expiresIn: process.env.TOKEN_EXP_TIME } // options
        );

        return res.status(201).json({
            ok: true,
            message: "Successfully registered",
            data: userDB,
            token
        });
    });
}

/**
 * Login, returns a jwt token
 */
exports.login = (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    }

    if(!user.email || !user.password){
        return res.status(400).json({
            ok: false,
            error: "Missing email and/or password"
        });
    }

    User.findOne({email: user.email}, (err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                error: "That email has not been registered"
            });
        }

        if(!bcrypt.compareSync(user.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                error: "Not valid password"
            });
        }

        delete userDB.password;
        let token = jwt.sign({
            user: userDB // payload
        }, process.env.SEED, // sign
            { expiresIn: process.env.TOKEN_EXP_TIME } // options
        );
        
        return res.status(200).json({
            ok: true,
            data: userDB,
            token
        });
    });
}

/**
 * returns auth user data
 */
exports.me = (req, res) => {
    User.findById(req.user._id, (err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                error: "Not user found"
            });
        }

        return res.status(200).json({
            ok: true,
            data: userDB
        });
    });
}