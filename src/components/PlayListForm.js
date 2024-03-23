import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {usePlayLists} from "../hooks/usePlayLists";

const PlayListForm = ({ videoId, setPlayListForm }) => {
    const { authState } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [playlists, fetchPlaylists] = usePlayLists();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    // Add a new playlist    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/videos/playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authState.authToken}`
            },
            body: JSON.stringify({ name, videoId, userId: authState.userId })
        })
        setName('');
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);

    // Save the video in the playlist
    const saveVideo = (playlistId) => {
        console.log(playlistId);
        fetch(`http://localhost:5000/videos/playlist/${playlistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authState.authToken}`
            },
            body: JSON.stringify({ playlistId, videoId, userId: authState.userId })
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Playlist name:
                <input type="text" name="name" value={name} onChange={handleChange} />
            </label>
            {playlists.map(playlist => (
                <div key={playlist._id}>
                    {/* when clicked calls a function that saves the video in the playlist */}
                    <button onClick={(e) => { e.preventDefault(); saveVideo(playlist._id); }}>
                        {playlist.name}
                    </button>
                </div>
            ))}
            <button type="submit">Add playlist</button>
            <button onClick={(e) => { e.preventDefault(); setPlayListForm(false); }}>Cancel</button>
        </form>
    );
};

export default PlayListForm;