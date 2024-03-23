import { useState } from "react";
import { authState } from "../context/AuthContext";

const usePlayLists = () => {
    const [playlists, setPlaylists] = useState([]);
    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:5000/videos/playlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState.authToken}`,
            },
            userData: JSON.stringify({ userId: authState.userId })
        })
        const data = await response.json();
        setPlaylists(data);
    }
    return [playlists, fetchPlaylists]
}

export default usePlayLists