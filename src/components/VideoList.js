// src\components\VideoList.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VideoDetails from './VideoDetails';

function VideoList() {
    const { authState } = useContext(AuthContext);
    const [videos, setVideos] = useState([]);
    const [showUserVideos, setShowUserVideos] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const endpoint = showUserVideos ? `/user/${authState.userId}` : '/';
                const response = await fetch(`http://localhost:5000/videos${endpoint}`);
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchVideos();
    }, [showUserVideos, authState.userId]);

    return (
        <div>
            {authState.authToken && (
                <button onClick={() => setShowUserVideos((prev) => !prev)}>
                    {showUserVideos ? 'Show All Videos' : 'Show My Videos'}
                </button>
            )}
            {videos.map((video) => (
                <div key={video._id}>
                    <VideoDetails video={video} />
                    <p>Uploaded by: {video.uploader.username}</p>
                </div>
            ))}
        </div>
    );
}

export default VideoList;