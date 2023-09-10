// src\components\VideoUpload.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function VideoUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const { authToken } = useContext(AuthContext);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default VideoUpload;