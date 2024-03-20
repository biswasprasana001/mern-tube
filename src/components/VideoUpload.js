// src\components\VideoUpload.js
// Importing the 'React' library. This library is used for building user interfaces in JavaScript.
import React from 'react';

// This is the VideoUpload component. It's a functional component that handles video upload.
// It takes several props: 'title', 'setTitle', 'description', 'setDescription', 'file', 'setFile', and 'handleSubmit'.
function VideoUpload({ title, setTitle, description, setDescription, file, setFile, handleSubmit }) {
    // The component returns a div containing two text input fields, a file input field, and a button.
    // The 'value' prop of the text input fields is set to the 'title' and 'description' state variables, and the 'onChange' prop is used to update these variables when the user types in the input fields.
    // The 'onChange' prop of the file input field is used to update the 'file' state variable when the user selects a file.
    // The 'onClick' prop of the button is used to call the 'handleSubmit' function when the button is clicked.
    return (
        <div>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

// Exporting the VideoUpload component as the default export of this module. This component can now be imported in other files and used.
export default VideoUpload;