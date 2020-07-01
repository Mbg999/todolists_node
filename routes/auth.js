"use strict";

const express = require('express');
const app = express();
const AuthController = require('../app/controllers/authController');
const { verifyToken } = require('../app/middlewares/authorization');

// unauthorized routes
app.post('/api/register', AuthController.register);
app.post('/api/login', AuthController.login);

// authorized routes
app.get('/api/me', verifyToken, AuthController.me);

module.exports = app;