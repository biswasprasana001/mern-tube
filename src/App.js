// src\App.js
import React from 'react';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <div>
      <VideoUpload />
      <VideoList />
    </div>
  );
}

export default App;