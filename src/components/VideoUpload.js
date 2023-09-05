// src\components\VideoUpload.js
import React, { useState } from 'react';

function VideoUpload() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to upload video data to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="url" placeholder="Video URL" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default VideoUpload;