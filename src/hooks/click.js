"use client";
// useClickSound.js
import { useEffect } from "react";
import useSound from "use-sound";

export default function useClickSound() {
  const [playClickSound] = useSound("/sounds/click.ogg", { volume: 0.2 });

  useEffect(() => {
    const handleUserGesture = () => {
      // Create and resume the AudioContext after a user gesture on the page
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContext.resume();
    };

    const handleMouseDown = () => {
      handleUserGesture();
      playClickSound({ playbackRate: 1.6 });
    };

    const handleMouseUp = () => {
      handleUserGesture();
      playClickSound({ playbackRate: 1.6 });
    };

    // Add event listeners to detect user gestures on the page
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleUserGesture);

    return () => {
      // Remove event listeners when the component unmounts
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleUserGesture);
    };
  }, [playClickSound]);

  return null;
}
