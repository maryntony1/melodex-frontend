import React, { useState } from "react";
import { getSong } from "./api/songs";
import Fretboard from "./components/Fretboard";

const API = "https://melodex-backend.onrender.com";

export default function App() {
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState(null);

  const loadLyrics = async () => {
    const res = await fetch(`${API}/song`);
    const data = await res.json();
    setLyrics(data.lyrics);
  };

  const loadDemoSong = async () => {
    const data = await getSong("demo_1");
    setSong(data);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Melodex</h1>
      </header>

      <main className="main">
        <button onClick={loadLyrics}>Load Test Lyrics</button>
        <div className="lyrics">{lyrics}</div>

        <button onClick={loadDemoSong}>Load Demo Progression</button>

        {song && (
          <div className="song-block">
            <h2>{song.title}</h2>
            <Fretboard progression={song.progression} />
          </div>
        )}
      </main>
    </div>
  );
}
