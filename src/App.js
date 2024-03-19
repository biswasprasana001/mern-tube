// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ useContext }' is a named export.
import React, { useContext } from 'react';

// Importing the AuthContext we created earlier. This will be used to access the authentication state and functions.
import { AuthContext } from './context/AuthContext';

// Importing various components from the 'components' directory.
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';

// This is the main App component.
function App() {
  // Using the 'useContext' hook to access the current value of AuthContext.
  // The current value here is the value prop of the closest AuthContext.Provider up the tree from this component.
  const { authState } = useContext(AuthContext);

  // The component returns a div that conditionally renders different components based on whether 'authToken' is present in 'authState'.
  return (
    <div>
      {!authState.authToken ? ( // If 'authToken' is not present (i.e., the user is not logged in)...
        <>
          <Register /> // ...render the Register component...
          <Login /> // ...and the Login component.
        </>
      ) : ( // If 'authToken' is present (i.e., the user is logged in)...
        <>
          <LogoutButton /> // ...render the LogoutButton component...
          <Home /> // ...and the Home component.
        </>
      )}
    </div>
  );
}

// Exporting the App component as the default export of this module.
export default App;