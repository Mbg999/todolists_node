"use strict";

// EXPRESS https://www.npmjs.com/package/express
const express = require('express');
const app = express();

// MONGOOSE object modeling tool https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');

// body parser, parses the request bodies https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
// suport parsing of application/json type
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded type
app.use(bodyParser.urlencoded({ extended: true }));

// SERVER CONFIG
require('./config/config');

//load routes, this is going to be full api routes
app.use(require('./routes/index.js'));

/**
 * mongoose connection
 */
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err)=>{
        if(err){
            console.log('CONNECTION TO DB FAILED');
            throw err;
        }

        console.log('DB ONLINE');
});

// start express listener
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port: ${process.env.PORT}`);
});