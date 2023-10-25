// src\components\VideoList.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VideoDetails from './VideoDetails';

function VideoList({ videos, showUserVideos, setShowUserVideos, handleDelete, isLoading }) {
    const { authState } = useContext(AuthContext);
    return (
        <div>
            {authState.authToken && (
                <button onClick={() => setShowUserVideos((prev) => !prev)}>
                    {showUserVideos ? 'Show All Videos' : 'Show My Videos'}
                </button>
            )}
            {isLoading && "...Loading"}
            {videos.map((video) => (
                <div key={video._id}>
                    <VideoDetails video={video} showDeleteButton={showUserVideos} onDelete={handleDelete} />
                    <p>Uploaded by: {video.uploader.username}</p>
                </div>
            ))}
        </div>
    );
}

export default VideoList;