import { useState } from "react";
import murmurhash from "murmurhash";
import Form from "./Form";
import Results from "/src/Components/Results";
import Playlist from "./Playlist";
import { searchSongs } from "../spotifyData";

export default function Main() {
  const [songs, setSongs] = useState([]);
  const [chosenSongs, setChosenSongs] = useState([]);
  /*
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  

    async function querySearch() {
      if (!query) return;
        try {
            const resultQuery = await searchSongs(query);
            setResults(resultQuery);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }
    */

    function getHashKey(data) {
      return murmurhash.v3(data).toString();
    }

    async function search(formData) {
        // api call passing down the input
        const search = formData.get("search");
        /*
        setQuery(search);
        const queryResutlt = await querySearch();
        console.log(queryResutlt);
        */
        // console.log(search);
        const searchObj = {
          title: "Title:" + search,
          artist: "SearchedArtist",
          album: "SearchedAlbum"
        }
        const hash = getHashKey(searchObj.title + searchObj.artist + searchObj.album);
        searchObj.id = hash.toString();
        console.log(searchObj.id);
        setSongs(prevSongs => {
          return [...prevSongs, searchObj]
        });
    }
    
    function submitForm(sumbitData) {
      const playName = sumbitData.get("playlistName")
      console.log(playName);
    }
    
    function addSong(songObj) {
      let toAdd = !chosenSongs.some((obj) => obj.id == songObj.id);
      if (toAdd) {
        setChosenSongs(prevChosen => {
          return [...prevChosen, songObj]
        })
      }
      console.log(chosenSongs);
    }
    
    function substractSong(songObj) {
      const subArr = []
      chosenSongs.forEach(chosen => {
        if (chosen.id != songObj.id) {
          subArr.push(chosen);
        }
      })
      setChosenSongs(subArr);
    }

    return (
        <main>
          <Form search={search}/>
          <section className="dataSection">
            <Results 
              songs={songs}
              addSong={addSong}
            />
            <Playlist
              chosenSongs={chosenSongs}
              submitForm={submitForm}
              substractSong={substractSong}
            />
          </section>
        </main>
    )
}