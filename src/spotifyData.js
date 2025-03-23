// Import environment variables
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID?.trim();
const clientSecret = import.meta.env.VITE_SPOTIFY_API_KEY?.trim();

// 🔹 Function to get Spotify Access Token
export const getAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`)
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    return data.access_token;
};

// 🔹 Function to Search Songs
export const searchSongs = async (query) => {
    const token = await getAccessToken(); // Get access token
    if (!token) throw new Error("Failed to get Spotify Access Token");

    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    const data = await response.json();
    return data.tracks.items;
};
