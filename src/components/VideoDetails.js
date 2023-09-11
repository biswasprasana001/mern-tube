// src\components\VideoDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function VideoDetails({ video }) {
    const { authToken } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        setComments(video.comments);
    }, [video]);

    const handleLike = () => {
        fetch(`http://localhost:5000/videos/${video._id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const handleComment = () => {
        fetch(`http://localhost:5000/videos/${video._id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ comment: newComment }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setComments([...comments, { comment: newComment }]);
                setNewComment('');
            })
            .catch(error => console.error('Error:', error));
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    };

    return (
        <div>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video src={video.url} controls width="600" />
            <p>Likes: {video.likes.length}</p>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleShare}>Share</button>
            <div>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleComment}>Comment</button>
            </div>
            <div>
                {comments.map((comment, index) => (
                    <p key={index}>{comment.comment}</p>
                ))}
            </div>
        </div>
    );
}

export default VideoDetails;
