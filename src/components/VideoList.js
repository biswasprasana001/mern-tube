// src\components\VideoList.js
import React, { useState, useEffect } from 'react';
import VideoDetails from './VideoDetails';

function VideoList() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
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