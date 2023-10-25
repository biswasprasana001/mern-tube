// src\components\Home.js
import React, { useState, useEffect, useContext } from 'react';
import VideoUpload from './VideoUpload';
import VideoList from './VideoList';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [showUserVideos, setShowUserVideos] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { authState } = useContext(AuthContext);

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState.authToken}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .then(() => fetchVideos())
            // .then(() => setIsLoading(false))
            .catch(error => console.error('Error:', error));
    };

    const fetchVideos = async () => {
        try {
            if (!isLoading) {
                setIsLoading(true);
            }
            const endpoint = showUserVideos ? `/user/${authState.userId}` : '/';
            const response = await fetch(`http://localhost:5000/videos${endpoint}`);
            const data = await response.json();
            setVideos(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [showUserVideos, authState.userId]);

    const handleDelete = (videoId) => {
        setVideos(videos.filter(video => video._id !== videoId));
    };

    return (
        <div>
            <VideoUpload
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                file={file}
                setFile={setFile}
                handleSubmit={handleSubmit}
            />
            <VideoList
                videos={videos}
                showUserVideos={showUserVideos}
                setShowUserVideos={setShowUserVideos}
                handleDelete={handleDelete}
                isLoading={isLoading}
            />
        </div>
    );
}

export default Home;