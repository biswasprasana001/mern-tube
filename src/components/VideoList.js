// src\components\VideoList.js
import React, { useState, useEffect } from 'react';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Add code to fetch video list from the backend
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoList;