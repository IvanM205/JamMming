import { useState } from "react";
import murmurhash from "murmurhash";
import Form from "./Form";
import Results from "/src/Components/Results";
import Playlist from "./Playlist";

export default function Main() {
  const [songs, setSongs] = useState([]);
  const [chosenSongs, setChosenSongs] = useState([]);

    function getHashKey(data) {
      return murmurhash.v3(data).toString();
    }

    function search(formData) {
        // api call passing down the input
        const search = formData.get("search");
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
      console.log(sumbitData);
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