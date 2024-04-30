import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../context/AuthContext';

import VideoDetails from './VideoDetails';

import usePlayLists from '../hooks/usePlayLists';

function VideoList({ videos, buttonState, setButtonState, handleDelete, isLoading }) {
    const { authState } = useContext(AuthContext);
    const [playlists, fetchPlaylists] = usePlayLists();
    const handlePlaylistDelete = (playlistId) => {
        fetch(`http://localhost:5000/videos/playlist/${playlistId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState.authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // fetchPlaylists();
                setButtonState('allVideos');
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        if (buttonState === 'playlists' && playlists.length === 0) fetchPlaylists();
    }, [buttonState])

    return (
        <div>
            {authState.authToken && (
                <button onClick={() => setButtonState('allVideos')}>All Videos</button>
            )}
            {authState.authToken && (
                <button onClick={() => setButtonState('userVideos')}>My Videos</button>
            )}
            {authState.authToken && (
                <button onClick={() => setButtonState('likedVideos')}>Liked Videos</button>
            )}
            {authState.authToken && (
                <button onClick={() => setButtonState('playlists')}>Saved Videos</button>
            )}
            {isLoading && "...Loading"}
            {buttonState !== 'allVideos' && buttonState !== 'userVideos' && buttonState !== 'likedVideos' && (
                <div>
                    {playlists.map(playlist => (
                        <div key={playlist._id}>
                            <button onClick={() => setButtonState(`${playlist._id}`)}>
                                {playlist.name}
                            </button>
                            <button onClick={() => handlePlaylistDelete(playlist._id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {videos.map((video) => (
                <div key={video._id}>
                    <VideoDetails video={video} buttonState={buttonState} onDelete={handleDelete} />
                    <p>Uploaded by: {video.uploader.username}</p>
                </div>
            ))}
        </div>
    );
}

export default VideoList;