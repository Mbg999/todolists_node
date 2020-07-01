"use strict";

const express = require('express');
const app = express();
const TodoController = require('../app/controllers/todoController');
const { verifyToken } = require('../app/middlewares/authorization');

// unauthorized routes
app.get('/api/todo/all/:skip?/:limit?', TodoController.all); // optional pagination options
app.get('/api/todo/:id', TodoController.findById);
app.get('/api/todo/user/:userId', TodoController.findByUserId);

// authorized routes
app.get('/api/todo/all/me', verifyToken, TodoController.allOfAuth);
app.post('/api/todo', verifyToken, TodoController.create);
app.put('/api/todo/:id', verifyToken, TodoController.update);
app.delete('/api/todo/:id', verifyToken, TodoController.destroy);

module.exports = app;