// backend\models\User.js
// We're importing the mongoose library, which provides a straightforward, schema-based solution to model our application data with MongoDB.
const mongoose = require('mongoose');

// We're importing the bcrypt library, which helps us securely hash and compare passwords.
const bcrypt = require('bcrypt');

// We're defining a new schema for our users. This schema will define the structure of the user documents in our MongoDB database.
const userSchema = new mongoose.Schema({
  // Each user will have a username. It is required and must be unique.
  username: { type: String, required: true, unique: true },

  // Each user will have a password. It is required.
  password: { type: String, required: true },
});

// Before we save a user document to the database, we want to perform some actions.
userSchema.pre('save', async function (next) {
  // If the password has been modified (or is new), we want to hash it before saving.
  if (this.isModified('password')) {
    // We're using bcrypt to hash the password. The '10' here refers to the number of rounds of hashing to perform - higher is more secure but slower.
    this.password = await bcrypt.hash(this.password, 10);
  }

  // We're calling 'next' to continue to the next middleware (or to the save operation if there are no more middlewares).
  next();
});

// We're adding a method to our user documents to compare a given password with the hashed password stored in the database.
userSchema.methods.comparePassword = function (password) {
  // We're using bcrypt to compare the given password with the hashed password.
  return bcrypt.compare(password, this.password);
};

// We're creating a User model from our schema and exporting it. This model provides us with a lot of built-in functionality to query and change the data in our database.
module.exports = mongoose.model('User', userSchema);