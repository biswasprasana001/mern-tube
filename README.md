# MERN Tube

## Overview

MERN Tube is a video-sharing platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to register, log in, upload videos, view and comment on videos, like videos, and manage playlists. This project demonstrates my skills in full-stack web development, with a focus on building robust and scalable applications.

## Features

- **User Authentication**: Secure registration, login, and logout functionalities.
- **Video Management**: Upload, delete, and list videos.
- **Comment System**: Comment on videos with the commenter's username displayed.
- **Like System**: Like and unlike videos.
- **Playlists**: Create and manage playlists.

## Live Demo

You can access the live version of the project [here](https://mern-tube-client.vercel.app/). Please note that it may take 50 seconds or longer to load, as the server shuts down after 30 minutes of inactivity and requires time to restart upon receiving a new request.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account (for video storage)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/biswasprasana001/mern-tube.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd mern-tube
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the backend server:**
   ```bash
   node server.js
   ```
5. **Start the frontend development server:**
   ```bash
   npm start
   ```
6. **Open a browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

1. **Register** a new user or **log in** with an existing account.
2. Once logged in, you can **upload videos**, **view videos**, **comment on videos**, and **like videos**.
3. Use the toggle button to switch between viewing all videos and only videos uploaded by you.
4. In the section displaying only your videos, you can delete any of your uploaded videos.
5. **Create and manage playlists** to organize your videos.

## Project Structure

### Client Side

- **Components**: Various React components for different functionalities.
  - `Authentication.js`: Handles user authentication.
  - `Home.js`: Home page displaying videos.
  - `VideoUpload.js`: Form for uploading videos.
  - `VideoList.js`: List of videos.
  - `VideoDetails.js`: Detailed view of a single video.
  - `PlayListForm.js`: Form for creating playlists.
- **Context**: Auth context for managing authentication state.
- **Hooks**: Custom hooks for playlist management.

### Server Side

- **Models**: MongoDB models for users, videos, and playlists.
  - `User.js`: User schema with authentication methods.
  - `Video.js`: Video schema with comments and likes.
  - `Playlist.js`: Playlist schema for organizing videos.
- **Routes**: Express routes for handling API requests.
  - `authRoutes.js`: Routes for user authentication.
  - `videoRoutes.js`: Routes for video CRUD operations.
- **Middleware**: Authentication middleware to protect routes.
- **Server.js**: Main server file to set up and start the Express server.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
