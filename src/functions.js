export async function authenticateWithSpotify() {
  // Helper functions
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const generateCodeChallenge = async (codeVerifier) => {
    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
  };

  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://localhost:5173/";
    
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
    
    try {
      const response = await fetch(url, payload);
      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        return data.access_token;
      } else {
        console.error('Token exchange failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return null;
    }
  };
    // Check if token already exists
  const existingToken = localStorage.getItem('access_token');
  if (existingToken) {
    console.log("Using existing token from localStorage");
    return existingToken;
  }

  // Constants
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = "http://localhost:5173/";
  const scope = "user-read-private user-read-email playlist-modify-private playlist-modify-public";

  // Store the current URL before redirect to return to the same page
  localStorage.setItem('spotify_auth_redirect_path', window.location.pathname + window.location.search);

  // Check if we're returning from auth redirect
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // If the code is present, exchange it for a token
    const token = await getToken(code);
    
    // Clean up the URL by removing the code parameter
    const cleanUrl = window.location.origin + 
                    window.location.pathname + 
                    window.location.search.replace(/[?&]code=[^&]+/, '');
    window.history.replaceState({}, document.title, cleanUrl);
    
    return token;
  } else {
    // If the code is not present, initiate the authorization flow
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem('code_verifier', codeVerifier);
    
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
      state: new Date().getTime().toString(), // Add a state parameter to prevent CSRF
    };
    
    authUrl.search = new URLSearchParams(params).toString();
    console.log("Redirecting to Spotify auth...");
    window.location.href = authUrl.toString();
    
    // We won't reach this point due to the redirect
    return null;
  }
}