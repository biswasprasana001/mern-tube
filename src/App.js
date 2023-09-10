// src\App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <div>
        <Register />
        <Login />
        <VideoUpload />
        <VideoList />
      </div>
    </AuthProvider>
  );
}

export default App;