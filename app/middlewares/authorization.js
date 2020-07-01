"use strict";

const jwt = require('jsonwebtoken');

/**
 * Verify jwt auth token
 */
const verifyToken = (req, res, next)=>{
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                error: "Invalid token"
            });
        }

        req.user = decoded.user; // adds the auth user to the request
        next();
    });
};

module.exports = {
    verifyToken
};