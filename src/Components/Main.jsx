import { useState } from "react";
import Form from "./Form";
import Results from "/src/Components/Results";
import Playlist from "./Playlist";

export default function Main() {
  const [songs, setSongs] = useState([]);

    function search(formData) {
        // api call passing down the input
        const search = formData.get("search");
        // console.log(search);
        const searchObj = {
          id: songs.length,
          title: "Title:" + search,
          artist: "SearchedArtist",
          album: "SearchedAlbum"
        }
        setSongs(prevSongs => {
          return [...prevSongs, searchObj]
        });
    }

    return (
        <main>
          <Form search={search}/>
          <section className="dataSection">
            <Results 
              songs={songs}
            />
            <Playlist />
          </section>
        </main>
    )
}