// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ useState, useContext }' are named exports.
import React, { useState, useContext } from 'react';

// Importing the AuthContext we created earlier. This will be used to access the authentication state and functions.
import { AuthContext } from '../context/AuthContext';

// This is the Login component. It's a functional component that handles user login.
function Login() {
  // Using the 'useState' hook to create state variables for 'username' and 'password'.
  // Both are initially set to an empty string.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Using the 'useContext' hook to access the current value of AuthContext.
  // The current value here is the value prop of the closest AuthContext.Provider up the tree from this component.
  const { setAuthState } = useContext(AuthContext);

  // This is the function that will be called when the user submits the login form.
  const handleSubmit = () => {
    // Using the 'fetch' function to send a POST request to the '/auth/login' endpoint.
    // The body of the request is a JSON string containing the 'username' and 'password'.
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      // The response from the server is converted to JSON.
      .then(response => response.json())
      // The data from the response is logged to the console and the 'authState' is updated with the token, username, and userId.
      .then(data => {
        console.log('Success:', data);
        setAuthState({ authToken: data.token, username: username, userId: data.userId });
      })
      // If there's an error with the request, it's caught here and logged to the console.
      .catch(error => console.error('Error:', error));
  };

  // The component returns a form with two input fields (for 'username' and 'password') and a submit button.
  // The 'onChange' prop is used to update the state variables when the user types in the input fields.
  // The 'onClick' prop on the button is used to call the 'handleSubmit' function when the button is clicked.
  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

// Exporting the Login component as the default export of this module.
export default Login;