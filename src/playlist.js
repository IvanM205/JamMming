/**
 * Functions for managing Spotify playlists.
 * Exports createPlaylist and addTracksToPlaylist functions.
 */
import { authenticateWithSpotify } from "./functions.js";

/**
 * Creates a new Spotify playlist for the current user.
 * Handles authentication automatically.
 * 
 * @param {string} name - The name of the playlist
 * @param {string} description - The description of the playlist (optional)
 * @param {boolean} isPublic - Whether the playlist should be public (default: false)
 * @returns {Promise<Object>} - The created playlist object
 */
export async function createPlaylist(name, description = "", isPublic = false) {
  try {
    // Get the authentication token
    const token = await authenticateWithSpotify();
    
    if (!token) {
      console.log("Authentication in progress or failed");
      return null;
    }
    
    // First, get the current user's ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(`Failed to get user profile: ${userResponse.status}`);
    }
    
    const userData = await userResponse.json();
    const userId = userData.id;
    
    // Create the playlist
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        public: isPublic
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create playlist: ${response.status}`);
    }
    
    const playlist = await response.json();
    console.log(`Playlist "${name}" created successfully!`);
    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
}

/**
 * Adds tracks to an existing Spotify playlist.
 * Handles authentication automatically.
 * 
 * @param {string} playlistId - The ID of the playlist
 * @param {Array<string>} trackUris - Array of Spotify track URIs to add
 * @param {number} position - Position to insert tracks (optional)
 * @returns {Promise<Object>} - The response from the Spotify API
 */
export async function addTracksToPlaylist(playlistId, trackId, position = null) {
  try {
    // Get the authentication token
    const token = await authenticateWithSpotify();
    
    if (!token) {
      console.log("Authentication in progress or failed");
      return null;
    }

    // Create the track URI array with single track
    const uris = [`spotify:track:${trackId}`];
    
    // Prepare request body
    const requestBody = {
      uris: uris
    };
    
    // Add position if specified
    if (position !== null) {
      requestBody.position = position;
    }
    
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error(`Failed to add track to playlist: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`Added track ${trackId} to playlist successfully!`);
    return result;
  } catch (error) {
    console.error('Error adding track to playlist:', error);
    throw error;
  }
}