import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the samples directory if it doesn't exist
const samplesDir = path.join(__dirname, '../public/samples/salamander');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

// Define all notes in order
const notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

// Define the octave range (0 to 7)
const octaves = [0, 1, 2, 3, 4, 5, 6, 7];

// Generate all note combinations
const allNotes = octaves.flatMap(octave => 
  notes.map(note => `${note}${octave}`)
);

// Base URL for the samples
const baseUrl = 'https://tonejs.github.io/audio/salamander/';

// Download each sample
allNotes.forEach(note => {
  const fileName = note.replace('#', 's') + '.mp3';
  const filePath = path.join(samplesDir, fileName);
  const url = baseUrl + fileName;
  
  if (fs.existsSync(filePath)) {
    console.log(`Sample ${fileName} already exists, skipping...`);
    return;
  }

  console.log(`Downloading ${fileName}...`);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        console.log(`Downloaded ${fileName}`);
        fileStream.close();
      });
    } else {
      console.error(`Failed to download ${fileName}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${fileName}:`, err);
  });
}); 