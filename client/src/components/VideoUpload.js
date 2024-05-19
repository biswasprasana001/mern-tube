// src\components\VideoUpload.js
import React from 'react';

function VideoUpload({ title, setTitle, description, setDescription, file, setFile, handleSubmit }) {
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