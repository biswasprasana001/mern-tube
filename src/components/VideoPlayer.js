// src\components\VideoPlayer.js
import React from 'react';

function VideoPlayer({ url }) {
  return (
    <div>
      <video controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;