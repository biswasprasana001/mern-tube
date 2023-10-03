// src\App.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';
import Register from './components/Register';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';

function App() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      {!authState.authToken ? ( // Conditionally render based on authToken
        <>
          <Register />
          <Login />
        </>
      ) : (
        <>
          <LogoutButton />
          <VideoUpload />
          <VideoList />
        </>
      )}
    </div>
  );
}

export default App;