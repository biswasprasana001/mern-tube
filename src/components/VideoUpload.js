// src\components\VideoUpload.js
import React, { useState } from 'react';

function VideoUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, url }),
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default VideoUpload;