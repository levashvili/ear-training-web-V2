import React, { useState } from 'react';
import Keyboard from '../components/Keyboard';

const KeyboardPreview: React.FC = () => {
  // Example: Show labels for C4, E4, F#4, G4, and C5
  const noteLabels = ['C4', 'E4', 'F#4', 'G4', 'C5'];
  // The first note in our melody is C4
  const firstNote = 'F#4';
  
  const handleKeyPress = (note: string) => {
    console.log('Pressed note:', note);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Keyboard Component Preview</h1>
      <div style={{ marginTop: '20px' }}>
        <Keyboard 
          range={['C4', 'C5']} 
          onKeyPress={handleKeyPress}
          noteLabels={noteLabels}
          highlightedNote={firstNote}
        />
      </div>
      <div style={{ marginTop: '20px', fontFamily: 'monospace' }}>
        <p>Press any key to see the note logged in the console</p>
        <p>Labels shown for: C4, E4, F#4, G4, and C5</p>
        <p>The first note (C4) is highlighted in blue</p>
      </div>
    </div>
  );
};

export default KeyboardPreview; 