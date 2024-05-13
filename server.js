// Importing the necessary modules from the 'express', 'mongoose', and 'cors' libraries.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing the routes for videos and authentication from the 'routes' directory.
const videoRoutes = require('./backend/routes/videoRoutes');
const authRoutes = require('./backend/routes/authRoutes');

// Creating an instance of an Express application. Express is a framework for building web applications on top of Node.js.
const app = express();

// Using the 'cors' middleware to enable Cross-Origin Resource Sharing. This allows client applications from different origins to interact with our server.
app.use(cors());

// Connecting to a MongoDB database using Mongoose. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks.
// The connection string is provided as the first argument, and an options object as the second.
// The 'useNewUrlParser' and 'useUnifiedTopology' options are set to true to use the new URL string parser and the new server discovery and monitoring engine, respectively.
// The 'then' method logs a success message to the console if the connection is successful, and the 'catch' method logs an error message if there's an error.
mongoose.connect('mongodb+srv://biswasprasana004:lQOfazb5pdQineVQ@cluster0.24xpqwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB")).catch((error) => console.error("Error connecting to MongoDB:", error));;

// Using the 'express.json' middleware to parse incoming requests with JSON payloads.
app.use(express.json());

// Using the imported routes for handling requests to '/videos' and '/auth'.
app.use('/videos', videoRoutes);
app.use('/auth', authRoutes);

// Starting the server on port 5000 and logging a message to the console once the server is running.
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});