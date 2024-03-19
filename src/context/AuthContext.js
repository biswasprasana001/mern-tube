// src\context\AuthContext.js
// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ createContext, useState }' are named exports.
import React, { createContext, useState } from 'react';

// Creating a new context for authentication. This will be used to share authentication data across components.
export const AuthContext = createContext();

// This is a component that provides the authentication context to its children.
// It takes 'children' as a prop, which represents the child components that will have access to the context.
export const AuthProvider = ({ children }) => {
  // 'useState' is a React hook that allows you to add state to your functional components.
  // Here, we're creating a state variable 'authState' with an initial state of an object with 'authToken', 'username', and 'userId' all set to null.
  // 'setAuthState' is the function we'll use to update 'authState'.
  const [authState, setAuthState] = useState({ authToken: null, username: null, userId: null });

  // This is a function that will log the user out by setting 'authState' back to its initial state.
  const logout = () => {
    setAuthState({ authToken: null, username: null, userId: null });
  };

  // The 'AuthProvider' component returns the 'AuthContext.Provider' component with its value set to an object containing 'authState', 'setAuthState', and 'logout'.
  // This means that any child components will have access to these values and can use them to read the authentication state, update it, or log the user out.
  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};