import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the samples directory if it doesn't exist
const samplesDir = path.join(__dirname, '../public/samples/piano');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

// Sample URLs (using free piano samples from a public source)
const samples = {
  'C4': 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/piano/C4.mp3',
  'D#4': 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/piano/Ds4.mp3',
  'F#4': 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/piano/Fs4.mp3',
  'A4': 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/piano/A4.mp3'
};

// Download each sample
Object.entries(samples).forEach(([note, url]) => {
  const filePath = path.join(samplesDir, `${note}.mp3`);
  
  if (fs.existsSync(filePath)) {
    console.log(`Sample ${note} already exists, skipping...`);
    return;
  }

  console.log(`Downloading ${note}...`);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
          console.log(`Downloaded ${note}`);
        })
        .on('error', (err) => {
          console.error(`Error downloading ${note}:`, err);
        });
    } else {
      console.error(`Failed to download ${note}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${note}:`, err);
  });
}); 