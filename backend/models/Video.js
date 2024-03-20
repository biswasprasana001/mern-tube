// backend\models\Video.js
// We're importing the mongoose library, which provides a straightforward, schema-based solution to model our application data with MongoDB.
const mongoose = require('mongoose');

// We're defining a new schema for our comments. This schema will define the structure of the comment documents in our MongoDB database.
const commentSchema = new mongoose.Schema({
  // Each comment will have a userId. This is a reference to the User who made the comment.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Each comment will have a username. It is required.
  username: { type: String, required: true },

  // Each comment will have a comment text. It is required.
  comment: { type: String, required: true },

  // Each comment will have a date. If not provided, the default will be the current date and time.
  date: { type: Date, default: Date.now },
});

// We're defining a new schema for our videos. This schema will define the structure of the video documents in our MongoDB database.
const videoSchema = new mongoose.Schema({
  // Each video will have a title. It is not required.
  title: String,

  // Each video will have a description. It is not required.
  description: String,

  // Each video will have a url. It is not required.
  url: String,

  // Each video will have an upload date. If not provided, the default will be the current date and time.
  uploadDate: {
    type: Date,
    default: Date.now,
  },

  // Each video will have an uploader. This is a reference to the User who uploaded the video.
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Each video will have likes. These are references to the Users who liked the video.
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Each video will have comments. These are subdocuments, each with a structure defined by the commentSchema.
  comments: [commentSchema],

  // Each video will have a cloudinary_id. This is required. It is the id of the video in Cloudinary, a cloud-based image and video management service.
  cloudinary_id: { type: String, required: true },
});

// We're creating a Video model from our schema and exporting it. This model provides us with a lot of built-in functionality to query and change the data in our database.
module.exports = mongoose.model('Video', videoSchema);