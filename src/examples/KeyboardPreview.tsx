import React, { useState, useEffect } from 'react';
import Keyboard from '../components/Keyboard';
import { audioService } from '../services/audioService';

const KeyboardPreview: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Example: Show labels for C4, E4, F#4, G4, and C5
  const noteLabels = ['C4', 'E4', 'F#4', 'G4', 'C5'];
  // The first note in our melody is C4
  const firstNote = 'C4';
  
  const initializeAudio = async () => {
    if (isLoading || isInitialized) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await audioService.initialize();
      setIsInitialized(true);
    } catch (err) {
      setError('Failed to initialize audio. Please try again.');
      console.error('Audio initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = async (note: string) => {
    if (!isInitialized) {
      await initializeAudio();
    }
    
    if (isInitialized) {
      console.log('Playing note:', note);
      await audioService.playNote(note);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Keyboard Component Preview</h1>
      {!isInitialized && (
        <button 
          onClick={initializeAudio}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginBottom: '20px',
            cursor: isLoading ? 'wait' : 'pointer'
          }}
        >
          {isLoading ? 'Initializing Audio...' : 'Click to Initialize Audio'}
        </button>
      )}
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <Keyboard 
          range={['C3', 'C5']} 
          onKeyPress={handleKeyPress}
          noteLabels={noteLabels}
          highlightedNote={firstNote}
        />
      </div>
      <div style={{ marginTop: '20px', fontFamily: 'monospace' }}>
        <p>Press any key to play the note and see it logged in the console</p>
        <p>Labels shown for: C4, E4, F#4, G4, and C5</p>
        <p>The first note (C4) is highlighted in blue</p>
        <p>{isInitialized ? 'Piano loaded and ready!' : 'Click the button above to initialize audio'}</p>
      </div>
    </div>
  );
};

export default KeyboardPreview; 