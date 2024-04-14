import React, { useContext } from 'react';

import { AuthContext } from './context/AuthContext';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';

function App() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      {!authState.authToken ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <>
          <LogoutButton />
          <Home />
        </>
      )}
    </div>
  );
}

export default App;