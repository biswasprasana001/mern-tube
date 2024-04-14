import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PlayListForm from './PlayListForm';

function VideoDetails({ video, buttonState, onDelete }) {
    const { authState } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [like, setLike] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [playListForm, setPlayListForm] = useState(false);

    useEffect(() => {
        setComments(video.comments);
        setLike(video.likes);
    }, [video]);

    const handleLike = () => {
        fetch(`http://localhost:5000/videos/${video._id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState.authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => setLike(data.likes))
            .catch(error => console.error('Error:', error));
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleComment = () => {
        fetch(`http://localhost:5000/videos/${video._id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState.authToken}`,
            },
            body: JSON.stringify({ username: authState.username, comment: newComment }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(authState);
                setComments([...comments, { username: authState.username, comment: newComment }]);
                setNewComment('');
            })
            .catch(error => console.error('Error:', error));
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/videos/${video._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState.authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onDelete(video._id);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video src={video.url} controls width="600" />
            <p>Likes: {like.length}</p>
            <button onClick={handleLike}>{like.includes(authState.userId) ? 'Unlike' : 'Like'}</button>
            <button onClick={handleShare}>Share</button>
            {buttonState != 'allVideos' && <button onClick={handleDelete}>Delete</button>}
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            <button onClick={() => setPlayListForm(true)}>Add to Playlist</button>
            {playListForm && (
                <PlayListForm videoId={video._id} setPlayListForm={setPlayListForm} />
            )}
            {showComments && (
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleComment}>Comment</button>
                    </div>
                    {comments.map((comment, index) => (
                        <p key={index}><strong>{comment.username}:</strong> {comment.comment}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoDetails;