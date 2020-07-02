"use strict";

/**
 *  ===================
 *   PORT production or development
 *  ===================
 */
process.env.PORT = process.env.PORT || 3000;

/**
 *  ===================
 *   ENVIRONMENT production or development
 *  ===================
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 *  ===================
 *   SEED auth token
 *  ===================
 */
process.env.SEED = process.env.SEED || 'todo-seed-token';

/**
 *  ===================
 *   TOKEN EXPIRATION TIME development or production
 *  ===================
 */
process.env.TOKEN_EXP_TIME = (process.env.NODE_ENV === 'dev') ? '48h' : 60*60*24*30; // 30 dias

/**
 *  ===================
 *   MONGODB uri development or production
 *  ===================
 */
process.env.MONGO_URI = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/ToDo' : process.env.MONGO_URI;
