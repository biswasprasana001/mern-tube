// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ useState }' is a named export.
import React, { useState } from 'react';

// This is the Register component. It's a functional component that handles user registration.
function Register() {
  // Using the 'useState' hook to create state variables for 'username' and 'password'.
  // Both are initially set to an empty string.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // This is the function that will be called when the user submits the registration form.
  const handleSubmit = () => {
    // Using the 'fetch' function to send a POST request to the '/auth/register' endpoint.
    // The body of the request is a JSON string containing the 'username' and 'password'.
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      // The response from the server is converted to JSON.
      .then(response => response.json())
      // The data from the response is logged to the console.
      .then(data => console.log('Success:', data))
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
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

// Exporting the Register component as the default export of this module.
export default Register;