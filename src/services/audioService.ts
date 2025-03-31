import * as Tone from 'tone';
import { Sampler } from 'tone';

class AudioService {
  private sampler: Sampler | null = null;
  private isInitialized = false;

  constructor() {
    // We'll initialize the sampler only after user interaction
  }

  async initialize() {
    try {
      // First, start the audio context with user interaction
      await Tone.start();
      
      // Create a sampler with basic piano notes and proper envelope settings
      this.sampler = new Sampler({
        urls: {
          'C4': 'C4.mp3',
          'D#4': 'Ds4.mp3',
          'F#4': 'Fs4.mp3',
          'A4': 'A4.mp3',
        },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        attack: 0.002,     // Much quicker attack for instant response
        release: 1.5,      // Longer release for natural decay
        volume: -8,        // Slightly reduce volume to prevent clipping
        curve: 'exponential', // Use exponential curve for more natural sound
        onload: () => {
          console.log('Piano samples loaded successfully');
          this.isInitialized = true;
        }
      }).toDestination();

    } catch (error) {
      console.error('Error initializing audio:', error);
      throw error;
    }
  }

  isSamplesLoaded(): boolean {
    return this.isInitialized;
  }

  async playNote(note: string) {
    if (!this.sampler || !this.isInitialized) {
      console.warn('Piano not initialized');
      return;
    }

    try {
      // Use attack and release instead of fixed duration
      this.sampler.triggerAttack(note);
      
      // Schedule the release after a longer duration
      setTimeout(() => {
        this.sampler?.triggerRelease(note);
      }, 2000); // 2 seconds, allowing for natural decay
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }

  // These methods are no longer needed since we're using a basic sampler
  async pedalDown() {}
  async pedalUp() {}
}

export const audioService = new AudioService(); 