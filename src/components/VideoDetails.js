// src\components\VideoDetails.js
// Importing necessary hooks and context from React and our application
import React, { useState, useEffect, useContext } from 'react'; // Importing React and some hooks from 'react'
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext from our context

// Defining a functional component called VideoDetails
function VideoDetails({ video, showDeleteButton, onDelete }) {
    // Using the useContext hook to access our AuthContext
    const { authState } = useContext(AuthContext); // Accessing authState from our AuthContext

    // Using the useState hook to create state variables for our component
    const [comments, setComments] = useState([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment
    const [like, setLike] = useState([]); // State for likes
    const [showComments, setShowComments] = useState(false); // State for showing/hiding comments

    // Using the useEffect hook to update our state variables when the video prop changes
    useEffect(() => {
        setComments(video.comments); // Updating comments state with comments from video prop
        setLike(video.likes); // Updating likes state with likes from video prop
    }, [video]); // This effect runs whenever the video prop changes

    // Function to handle liking a video
    const handleLike = () => {
        // Making a POST request to our server to like the video
        fetch(`http://localhost:5000/videos/${video._id}/like`, {
            method: 'POST', // Specifying the request method
            headers: {
                Authorization: `Bearer ${authState.authToken}`, // Sending the auth token in the request headers
            },
        })
            .then(response => response.json()) // Parsing the response data as JSON
            .then(data => setLike(data.likes)) // Updating the likes state with the new likes data
            .catch(error => console.error('Error:', error)); // Logging any errors
    };

    // Function to toggle showing/hiding comments
    const toggleComments = () => {
        setShowComments(!showComments); // Updating showComments state to its opposite value
    };

    // Function to handle commenting on a video
    const handleComment = () => {
        // Making a POST request to our server to add a comment to the video
        fetch(`http://localhost:5000/videos/${video._id}/comment`, {
            method: 'POST', // Specifying the request method
            headers: {
                'Content-Type': 'application/json', // Specifying the content type of our request body
                Authorization: `Bearer ${authState.authToken}`, // Sending the auth token in the request headers
            },
            body: JSON.stringify({ username: authState.username, comment: newComment }), // Sending the username and new comment in the request body
        })
            .then(response => response.json()) // Parsing the response data as JSON
            .then(data => {
                console.log(data); // Logging the response data
                console.log(authState); // Logging the auth state
                setComments([...comments, { username: authState.username, comment: newComment }]); // Updating the comments state with the new comment
                setNewComment(''); // Resetting the newComment state
            })
            .catch(error => console.error('Error:', error)); // Logging any errors
    };

    // Function to handle sharing a video
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href); // Copying the current URL to the clipboard
        alert('Link copied to clipboard'); // Alerting the user that the link has been copied
    };

    // Function to handle deleting a video
    const handleDelete = () => {
        // Making a DELETE request to our server to delete the video
        fetch(`http://localhost:5000/videos/${video._id}`, {
            method: 'DELETE', // Specifying the request method
            headers: {
                Authorization: `Bearer ${authState.authToken}`, // Sending the auth token in the request headers
            },
        })
            .then(response => response.json()) // Parsing the response data as JSON
            .then(data => {
                console.log(data); // Logging the response data
                onDelete(video._id); // Calling the onDelete function passed as a prop with the video's ID
            })
            .catch(error => console.error('Error:', error)); // Logging any errors
    };

    // The JSX that our component returns
    return (
        <div>
            <h2>{video.title}</h2>
            {/* Displaying the video's title */}
            <p>{video.description}</p>
            {/* Displaying the video's description */}
            <video src={video.url} controls width="600" />
            {/* Displaying the video player */}
            <p>Likes: {like.length}</p>
            {/* Displaying the number of likes */}
            <button onClick={handleLike}>Like</button>
            {/* Like button */}
            <button onClick={handleShare}>Share</button>
            {/* Share button */}
            {showDeleteButton && <button onClick={handleDelete}>Delete</button>}
            {/* Delete button, only shown if showDeleteButton is true */}
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
                {/* Button to toggle showing/hiding comments */}
            </button>
            {showComments && (
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)} // Updating newComment state when the input changes
                        />
                        <button onClick={handleComment}>Comment</button>
                        {/* Comment button */}
                    </div>
                    {comments.map((comment, index) => (
                        <p key={index}><strong>{comment.username}:</strong> {comment.comment}</p> // Displaying each comment
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoDetails; // Exporting our component