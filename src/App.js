// src\App.js
import React from 'react';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Register />
      <Login />
      <VideoUpload />
      <VideoList />
      <VideoPlayer />
    </div>
  );
}

export default App;