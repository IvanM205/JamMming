# Spotify Playlist Application: Technical Details

This app lets you search for songs on Spotify and create playlists! It's like a special tool that connects to Spotify's music.

## What It Does

* **Searches for Songs:** You can find any song you want.
* **Makes Playlists:** You can create your own Spotify playlists.
* **Uses Spotify's Music Library:** It talks to Spotify's servers to get song info.

## How It Works

### The App's Parts

* **React (The Screen):** This makes the buttons and song lists you see.
    * **Components:** These are like building blocks:
        * **Form:** Where you type song names.
        * **Results:** Shows the songs you find.
        * **Playlist:** Helps you choose songs for your playlist.
    * **useState (The Memory):** Remembers the songs you search and choose.
    * **async/await (Waiting):** Waits for Spotify to send song info.
* **Spotify Web API (The Messenger):** Talks to Spotify's servers.
    * **Authentication (Your Key):** Shows Spotify you're allowed to use it.
    * **Search:** Finds songs you search for.
    * **Playlist Creation:** Makes new playlists.
    * **Track Addition:** Adds songs to your playlists.
* **murmurhash (The Song ID):** Gives each song a unique number.

### Important Things

* **Waiting for Info:** The app waits for Spotify without freezing.
* **Keeping Things Fast:** It keeps track of songs quickly.
* **Not Asking Too Much:** It doesn't ask Spotify for too much info at once.
* **Dealing with Errors:** It's ready for problems, like if Spotify is down.

### What I Learned

* **Talking to Websites:** How to get info from Spotify's servers.
* **Doing Things Later:** How to do things that take time.
* **Remembering Stuff:** How to keep track of info in the app.

This project was a cool way to learn about making apps that use other websites!