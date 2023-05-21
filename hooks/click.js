'use client';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';

export default function useClickSound() {
  const [playClickSound] = useSound('/sounds/click.ogg', { volume: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleUserGesture = () => {
      // Create and resume the AudioContext after a user gesture on the page
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContext.resume();
    };

    // Add event listeners to detect user gestures on the page
    document.addEventListener('mousedown', handleUserGesture);
    document.addEventListener('keydown', handleUserGesture);

    return () => {
      // Remove event listeners when the component unmounts
      document.removeEventListener('mousedown', handleUserGesture);
      document.removeEventListener('keydown', handleUserGesture);
    };
  }, []);

  const handleMouseClick = (event) => {
    if (event.button === 0) {
      if (!isPlaying) {
        playClickSound({ playbackRate: 1.6 });
        setIsPlaying(true);
      } else {
        playClickSound({ playbackRate: 1.6 });
        setIsPlaying(false);
      }
    }
  };

  return [handleMouseClick];
}