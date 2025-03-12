import { useState } from "react";
import murmurhash from "murmurhash";
import Form from "./Form";
import Results from "/src/Components/Results";
import Playlist from "./Playlist";
import { searchSongs } from "../spotifyData.js";

export default function Main() {
  const [songs, setSongs] = useState([]);
  const [chosenSongs, setChosenSongs] = useState([]);

    function getHashKey(data) {
      return murmurhash.v3(data).toString();
    }

    async function search(formData) {
        // api call passing down the input
        setSongs([]);
        const searchData = formData.get("search");
        const search = (searchData) ? searchData : "Okay";
        const result = await searchSongs(search);
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          const searchObj = {
            title: "Title: " + result[i].name,
            artist: "Artist: " + result[i].artists[0].name,
            album: "Album: " + result[i].album.name
          }
          const hash = getHashKey(searchObj.title + searchObj.artist + searchObj.album);
          searchObj.id = hash.toString();
          console.log(searchObj.id);

          setSongs(prevSongs => {
            return [...prevSongs, searchObj]
          });
        }
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
          <Form 
            search={search}
          />
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