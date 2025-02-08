import Song from "/src/Components/Song";

export default function Results(props) {
    // console.log(props);
    const arraySongObjects = props.songs; 
    const listSongs = arraySongObjects.map(obj => {
        return (
          <li key={obj.id}>
            <Song
              title={obj.title}
              artist={obj.artist}
              album={obj.album}
            />
          </li>
        )
    }
    )
    

    return (
        <article className="rpContainer">
            <h2>Results</h2>
            <ul className="resultsList">
              {listSongs}
            </ul>
        </article>
    )
}