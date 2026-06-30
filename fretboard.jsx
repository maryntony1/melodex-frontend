import React, { useEffect, useState } from "react";
import { getChord } from "../api/chords";

export default function Fretboard({ progression }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chordData, setChordData] = useState(null);

  useEffect(() => {
    const loadChord = async () => {
      const step = progression[currentIndex];
      const data = await getChord(step.chord);
      setChordData(data);
    };
    loadChord();
  }, [currentIndex, progression]);

  if (!chordData) return <div>Loading chord...</div>;

  return (
    <div className="fretboard-wrapper">
      <div className="top-bar">
        <span className="logo-text">Melodex</span>
        <span className="chord-name">{chordData.name}</span>
      </div>

      <div className="fretboard">
        {[...Array(6)].map((_, stringIndex) => (
          <div key={stringIndex} className="string-row">
            {[...Array(5)].map((_, fretIndex) => {
              const stringNumber = 6 - stringIndex;
              const fretNumber = fretIndex + 1;

              const isDot = chordData.positions.some(
                (p) => p.string === stringNumber && p.fret === fretNumber
              );

              return (
                <div key={fretIndex} className="fret-cell">
                  {isDot && <div className="dot" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="controls">
        <button
          onClick={() =>
            setCurrentIndex((i) => (i > 0 ? i - 1 : progression.length - 1))
          }
        >
          ◀
        </button>
        <span className="step-label">
          Step {currentIndex + 1} / {progression.length}
        </span>
        <button
          onClick={() =>
            setCurrentIndex((i) => (i + 1) % progression.length)
          }
        >
          ▶
        </button>
      </div>
    </div>
  );
}
