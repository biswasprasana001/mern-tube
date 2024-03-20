// src\components\VideoList.js
// Importing the necessary modules from the 'react' library.
// 'React' is the default export of the library, and '{ useContext }' is a named export.
import React, { useContext } from 'react';

// Importing the AuthContext we created earlier. This will be used to access the authentication state and functions.
import { AuthContext } from '../context/AuthContext';

// Importing the VideoDetails component from the 'components' directory.
import VideoDetails from './VideoDetails';

// This is the VideoList component. It's a functional component that displays a list of videos.
// It takes several props: 'videos', 'showUserVideos', 'setShowUserVideos', 'handleDelete', and 'isLoading'.
function VideoList({ videos, showUserVideos, setShowUserVideos, handleDelete, isLoading }) {
    // Using the 'useContext' hook to access the current value of AuthContext.
    // The current value here is the value prop of the closest AuthContext.Provider up the tree from this component.
    const { authState } = useContext(AuthContext);

    // The component returns a div containing a button (if 'authToken' is present), a loading message (if 'isLoading' is true), and a list of videos.
    // The 'onClick' prop of the button is used to toggle the 'showUserVideos' state variable.
    // The 'videos' state variable is mapped to a list of VideoDetails components.
    // The 'showDeleteButton' prop of the VideoDetails component is set to 'showUserVideos', and the 'onDelete' prop is set to 'handleDelete'.
    return (
        <div>
            {authState.authToken && (
                <button onClick={() => setShowUserVideos((prev) => !prev)}>
                    {showUserVideos ? 'Show All Videos' : 'Show My Videos'}
                </button>
            )}
            {isLoading && "...Loading"}
            {videos.map((video) => (
                <div key={video._id}>
                    <VideoDetails video={video} showDeleteButton={showUserVideos} onDelete={handleDelete} />
                    <p>Uploaded by: {video.uploader.username}</p>
                </div>
            ))}
        </div>
    );
}

// Exporting the VideoList component as the default export of this module. This component can now be imported in other files and used.
export default VideoList;