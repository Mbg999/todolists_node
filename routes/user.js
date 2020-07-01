"use strict";

const express = require('express');
const app = express();
const { verifyToken } = require('../app/middlewares/authorization');

const UserController = require('../app/controllers/userController');

// unauthorized routes
app.get('/api/users/all/:skip?/:limit?', UserController.all); // optional pagination options
app.get('/api/users/:id', UserController.findById);

// unauthorized routes
app.put('/api/users', verifyToken, UserController.update);
app.delete('/api/users', verifyToken, UserController.destroy);

module.exports = app;