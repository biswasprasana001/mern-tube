// Importing the necessary modules from the 'react' and 'react-dom/client' libraries.
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the CSS file for the application. This file contains the global styles for the app.
import './index.css';

// Importing the main App component. This is the root component of your application.
import App from './App';

// Importing a module that reports web vitals. Web vitals are metrics related to speed, responsiveness, and stability of your web page.
import reportWebVitals from './reportWebVitals';

// Importing the AuthProvider component from the AuthContext file. This component provides authentication context to its children.
import { AuthProvider } from './context/AuthContext';

// Creating a root for your application. This is where your React application will be attached in your HTML file.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering your application. This is where React starts and injects your components into the HTML file.
// The application is wrapped in React's StrictMode to highlight potential problems in an application during development.
// The App component is wrapped in the AuthProvider to provide authentication context to the App and its child components.
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Calling the function to report web vitals. This can be useful for understanding the performance of your application in the real world.
reportWebVitals();