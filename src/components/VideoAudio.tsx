import React from "react";
import { Audio, staticFile } from "remotion";

/**
 * VideoAudio - Global audio orchestrator
 * 
 * HOW TO USE:
 * 1. Place your audio files in the `public/` folder.
 * 2. Update the filenames below to match your files.
 * 
 * MOCK MODE (current): Audio components are disabled until real files are placed.
 * Once you add files, uncomment the relevant <Audio> blocks below.
 */
export const VideoAudio: React.FC = () => {
  // Check if we're in mock mode by trying to use a placeholder
  // Uncomment the blocks below once you have your audio files ready:

  // --- BACKGROUND MUSIC ---
  // Place your loop music at: public/bg-music.mp3
  // <Audio src={staticFile("bg-music.mp3")} loop volume={0.2} />

  // --- TRANSITION HIT SFX ---
  // Place your hit sound at: public/hit.mp3
  // <Audio src={staticFile("hit.mp3")} startFrom={0} endAt={30} volume={0.6} />

  // --- WHOOSH SFX ---
  // Place your whoosh sound at: public/whoosh.mp3
  // <Audio src={staticFile("whoosh.mp3")} startFrom={0} endAt={15} volume={0.5} />

  // Currently returning null so renders don't break.
  // Replace "null" with the Audio components above when ready.
  return null;
};
