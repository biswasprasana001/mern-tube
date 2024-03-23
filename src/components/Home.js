// src\components\Home.js
// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ useState, useEffect, useContext }' are named exports.
import React, { useState, useEffect, useContext } from 'react';

// Importing the VideoUpload and VideoList components from the 'components' directory.
import VideoUpload from './VideoUpload';
import VideoList from './VideoList';

// Importing the AuthContext we created earlier. This will be used to access the authentication state and functions.
import { AuthContext } from '../context/AuthContext';

// This is the Home component. It's a functional component that handles video upload and listing.
function Home() {
    // Using the 'useState' hook to create state variables for 'title', 'description', 'file', 'videos', 'buttonState', and 'isLoading'.
    // All are initially set to either an empty string, null, an empty array, or false.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [buttonState, setButtonState] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Using the 'useContext' hook to access the current value of AuthContext.
    // The current value here is the value prop of the closest AuthContext.Provider up the tree from this component.
    const { authState } = useContext(AuthContext);

    // This is the function that will be called when the user submits the video upload form.
    const handleSubmit = () => {
        // Setting 'isLoading' to true to indicate that a request is being made.
        setIsLoading(true);

        // Creating a new FormData instance to hold the form data.
        const formData = new FormData();
        // Appending the 'title', 'description', and 'file' to the form data.
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        // Using the 'fetch' function to send a POST request to the '/videos' endpoint.
        // The body of the request is the form data.
        // The 'Authorization' header is set to the 'authToken' from 'authState'.
        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState.authToken}`,
            },
            body: formData,
        })
            // The response from the server is converted to JSON.
            .then(response => response.json())
            // The data from the response is logged to the console and the 'fetchVideos' function is called to update the list of videos.
            .then(data => console.log('Success:', data))
            .then(() => fetchVideos())
            // If there's an error with the request, it's caught here and logged to the console.
            .catch(error => console.error('Error:', error));
    };

    // This is the function that fetches the list of videos.
    const fetchVideos = async () => {
        try {
            // If 'isLoading' is false, it's set to true to indicate that a request is being made.
            if (!isLoading) {
                setIsLoading(true);
            }
            let endpoint = '';
            if (buttonState === 'allVideos') {
                endpoint = '/';
            } else if (buttonState === 'userVideos') {
                endpoint = `/user/${authState.userId}`;
            } else if (buttonState === 'likedVideos') {
                endpoint = `/my-likes/${authState.userId}`;
            }
            const response = await fetch(`http://localhost:5000/videos${endpoint}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authState.authToken}`,
                },
            });
            // The response from the server is converted to JSON.
            const data = await response.json();
            // The 'videos' state variable is updated with the data from the response.
            setVideos(data);
            // 'isLoading' is set to false to indicate that the request has completed.
            setIsLoading(false);
        } catch (error) {
            // If there's an error with the request, it's caught here and logged to the console.
            console.error('Error:', error);
        }
    };

     const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:5000/videos/playlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState.authToken}`,
            },
            userData: JSON.stringify({ userId: authState.userId })
        })
        const data = await response.json();
        setPlaylists(data);
    }

    // The 'useEffect' hook is used to call the 'fetchVideos' function when the component mounts and whenever 'buttonState' or 'authState.userId' changes.
    useEffect(() => {
        fetchVideos();
    }, [buttonState, authState.userId]);

    // This is the function that will be called when a video is deleted. It removes the video from the 'videos' state variable.
    const handleDelete = (videoId) => {
        setVideos(videos.filter(video => video._id !== videoId));
    };

    // The component returns a div containing the VideoUpload and VideoList components.
    // The state variables and functions are passed as props to these components.
    return (
        <div>
            <VideoUpload
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                file={file}
                setFile={setFile}
                handleSubmit={handleSubmit}
            />
            <VideoList
                videos={videos}
                buttonState={buttonState}
                setButtonState={setButtonState}
                handleDelete={handleDelete}
                isLoading={isLoading}
            />
        </div>
    );
}

// Exporting the Home component as the default export of this module.
export default Home;