
export default function Song(props) {
    const buttonSymbol = (props.type === "results") ? "+" : "-"
    return (
        <div className="songElement">
            <h3>{props.title}</h3>
            <div className="artistAlbum">
              <h4>{props.artist}</h4>
              <h4>{props.album}</h4>
              <button onClick={() => {props.handleClick(props)}}>{buttonSymbol}</button>
            </div>
            <hr/>
        </div>
    )
}