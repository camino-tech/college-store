const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// setup for dotenv
require('dotenv').config();

// setup
const app = express();
const port = process.env.PORT || 3001;

// setup
app.use(cors());
app.use(express.json());

// uri is the mongodb atlas uri from dashboard.
// for new projects add the new uri into a .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

// connects to the database and post a message on success.
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

/**
 * Any time you want to add a new collection(route + model) you must first
 * require the routes then call app.use() which takes 2 arguments.
 * 1. the route
 * 2. the router
 * 
 * below there is the user collection and the stuff collection. for every
 * added collection do the same.
 */

// users collection
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// stuffs collection
const stuffsRouter = require('./routes/stuffs');
app.use('/stuffs', stuffsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
