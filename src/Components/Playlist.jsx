import Song from "/src/Components/Song";

export default function Playlist(props) {
    const arrayChosenSongs = props.chosenSongs; 
    const listSongs = arrayChosenSongs.map(obj => {
        return (
            <li key={obj.id}>
              <Song
                id={obj.id}
                title={obj.title}
                artist={obj.artist}
                album={obj.album}
                handleClick={props.substractSong}
                type={"playlist"}
                trackId={obj.trackId}
               />
            </li>
            )
        }
        )
    return (
        <article className="rpContainer">
            <form action={props.submitForm} className="submitForm">
              <input
                className="playlistName"
                type="text"
                placeholder="Enter playlist name"
                aria-label="Name your playlist"
                name="playlistName"
              />
              <ul className="songsList playSongs">
                {listSongs}
              </ul>
              <button className="saving">Save to Spotify</button>
            </form>
        </article>
    )
}