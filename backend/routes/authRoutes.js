// backend\routes\authRoutes.js
// Importing the necessary modules from the 'express', 'jsonwebtoken' libraries and User model.
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Defining a route for user registration. This route will be accessed when a POST request is made to '/register'.
router.post('/register', async (req, res) => {
  try {
    // Creating a new user with the data in the request body.
    const user = new User(req.body);
    // Saving the user to the database. This is an asynchronous operation, so we use 'await' to wait for it to complete.
    await user.save();
    // Sending a response with a status code of 201 (Created) and a message indicating that the user was registered successfully.
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // If there's an error, we send a response with a status code of 400 (Bad Request) and the error message.
    res.status(400).json({ message: err.message });
  }
});

// Defining a route for user login. This route will be accessed when a POST request is made to '/login'.
router.post('/login', async (req, res) => {
  try {
    // Looking for a user in the database with the username provided in the request body.
    const user = await User.findOne({ username: req.body.username });
    // If no user is found, or the password provided doesn't match the user's password, we send a response with a status code of 400 (Bad Request) and an error message.
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // If the username and password are correct, we create a JSON Web Token (JWT) for the user. The token includes the user's ID and expires in 1 hour.
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    // We send a response with the token and the user's ID.
    res.json({ token, userId: user._id });
  } catch (err) {
    // If there's an error, we send a response with a status code of 500 (Internal Server Error) and the error message.
    res.status(500).json({ message: err.message });
  }
});

// Exporting the router as the module's export. This router can now be imported in other files and used to handle incoming requests.
module.exports = router;