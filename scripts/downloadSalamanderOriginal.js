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

// Base URL for the Salamander Grand Piano samples
const baseUrl = 'https://raw.githubusercontent.com/sfzinstruments/SalamanderGrandPiano/master/samples/';

// Define velocity layers (we'll use velocity 8 as it's a good middle ground)
const velocityLayer = 'v8';

// Define all notes in order (A0 to C8)
const notes = [];
const noteNames = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

// Generate note names from A0 to C8
for (let octave = 0; octave <= 8; octave++) {
  noteNames.forEach(note => {
    // Skip notes before A0
    if (octave === 0 && noteNames.indexOf(note) < noteNames.indexOf('A')) return;
    // Skip notes after C8
    if (octave === 8 && noteNames.indexOf(note) > noteNames.indexOf('C')) return;
    
    notes.push(`${note}${octave}`);
  });
}

// Function to download a file with retries
const downloadFile = (url, filePath, retries = 3) => {
  return new Promise((resolve, reject) => {
    const download = () => {
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filePath);
          response.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${path.basename(filePath)}`);
            resolve();
          });
          
          fileStream.on('error', (err) => {
            fs.unlink(filePath, () => {});
            if (retries > 0) {
              console.log(`Retrying download of ${path.basename(filePath)}...`);
              download();
            } else {
              reject(err);
            }
          });
        } else {
          console.error(`Failed to download ${path.basename(filePath)}: ${response.statusCode}`);
          if (retries > 0) {
            console.log(`Retrying download of ${path.basename(filePath)}...`);
            download();
          } else {
            reject(new Error(`HTTP Status ${response.statusCode}`));
          }
        }
      }).on('error', (err) => {
        if (retries > 0) {
          console.log(`Retrying download of ${path.basename(filePath)}...`);
          download();
        } else {
          reject(err);
        }
      });
    };
    
    download();
  });
};

// Download each sample
async function downloadSamples() {
  for (const note of notes) {
    // Convert note name to filename format (e.g., A0v8.wav)
    const fileName = `${note}${velocityLayer}.wav`;
    const filePath = path.join(samplesDir, fileName);
    const url = baseUrl + fileName;
    
    if (fs.existsSync(filePath)) {
      console.log(`Sample ${fileName} already exists, skipping...`);
      continue;
    }

    console.log(`Downloading ${fileName}...`);
    try {
      await downloadFile(url, filePath);
    } catch (error) {
      console.error(`Failed to download ${fileName} after retries:`, error);
    }
  }
}

downloadSamples().then(() => {
  console.log('Download completed!');
}).catch(error => {
  console.error('Download failed:', error);
}); 