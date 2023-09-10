// src\components\VideoList.js
import React, { useState, useEffect } from 'react';

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
            {videos.map(video => (
                <div key={video._id}>
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <video src={video.url} controls width="600" />
                </div>
            ))}
        </div>
    );
}

export default VideoList;