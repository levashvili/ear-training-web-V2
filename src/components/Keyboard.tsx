import React from 'react';
import './Keyboard.css';

interface KeyboardProps {
  range: [string, string]; // Array of two notes, e.g., ['C4', 'C5']
  onKeyPress: (note: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ range, onKeyPress }) => {
  // Define the notes in order
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Helper function to get all notes between range
  const getNotesInRange = () => {
    const [startNote, endNote] = range;
    const startOctave = parseInt(startNote.slice(-1));
    const endOctave = parseInt(endNote.slice(-1));
    const startNoteName = startNote.slice(0, -1);
    const endNoteName = endNote.slice(0, -1);
    
    const startIndex = notes.indexOf(startNoteName);
    const endIndex = notes.indexOf(endNoteName);
    
    const result: string[] = [];
    
    for (let octave = startOctave; octave <= endOctave; octave++) {
      const start = octave === startOctave ? startIndex : 0;
      const end = octave === endOctave ? endIndex : 11;
      
      for (let i = start; i <= end; i++) {
        result.push(`${notes[i]}${octave}`);
      }
    }
    
    return result;
  };

  const notesInRange = getNotesInRange();

  return (
    <div className="keyboard">
      {notesInRange.map((note) => {
        const isSharp = note.includes('#');
        return (
          <button
            key={note}
            className={`key ${isSharp ? 'sharp' : 'white'}`}
            onClick={() => onKeyPress(note)}
          >
            <span className="note-label">{note}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard; 