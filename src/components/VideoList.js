import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import VideoDetails from './VideoDetails';

import usePlayLists from '../hooks/usePlayLists';

function VideoList({ videos, buttonState, setButtonState, handleDelete, isLoading }) {
    const { authState } = useContext(AuthContext);
    const [playlists, fetchPlaylists] = usePlayLists();
    if (buttonState === 'playlists' && playlists.length === 0) fetchPlaylists();
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
            {buttonState === 'playlists' && (
                <div>
                    {playlists.map(playlist => (
                        <button key={playlist._id} onClick={() => setButtonState(`${playlist._id}`)}>
                            {playlist.name}
                        </button>
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