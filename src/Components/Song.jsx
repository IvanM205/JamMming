
export default function Song(props) {
    return (
        <div className="songElement">
            <h3>{props.title}</h3>
            <div className="artistAlbum">
              <h4>{props.artist}</h4>
              <h4>{props.album}</h4>
            </div>
            <hr/>
        </div>
    )
}