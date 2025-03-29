import React from 'react';
import Keyboard from '../components/Keyboard';

const KeyboardPreview: React.FC = () => {
  const handleKeyPress = (note: string) => {
    console.log('Pressed note:', note);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Keyboard Component Preview</h1>
      <div style={{ marginTop: '20px' }}>
        <Keyboard 
          range={['C3', 'C5']} 
          onKeyPress={handleKeyPress} 
        />
      </div>
      <div style={{ marginTop: '20px', fontFamily: 'monospace' }}>
        <p>Press any key to see the note logged in the console</p>
      </div>
    </div>
  );
};

export default KeyboardPreview; 