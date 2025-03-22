import Song from "/src/Components/Song";

export default function Results(props) {
    // console.log(props);
    const arraySongObjects = props.songs; 
    const listSongs = arraySongObjects.map(obj => {
        return (
          <li key={obj.id}>
            <Song
              id={obj.id}
              title={obj.title}
              artist={obj.artist}
              album={obj.album}
              handleClick={props.addSong}
              type={"results"}
              trackId={obj.trackId}
            />
          </li>
        )
    }
    )
    

    return (
        <article className="rpContainer">
            <h2>Results</h2>
            <ul className="songsList">
              {listSongs}
            </ul>
        </article>
    )
}