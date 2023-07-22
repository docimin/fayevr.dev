import React, { useEffect, useRef, useState } from "react";
import useDarkMode from "@/components/useDarkMode";

const LightBulb = () => {
  const [colorTheme, setTheme, osTheme] = useDarkMode();
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src =
      colorTheme === "light" ? "/files/lighton.mp4" : "/files/lightoff.mp4";
    videoRef.current.load();
  }, [colorTheme]);

  const handleButtonClick = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      document.querySelector("button").disabled = true;
      console.log(colorTheme)
      setTimeout(() => {
        video.src =
          colorTheme === "light" ? "/files/lightoff.mp4" : "/files/lighton.mp4";
        video.load();
        document.querySelector("button").disabled = false;
      }, 10000);
      setTimeout(() => {
        setTheme(colorTheme === "light" ? "dark" : "light");
      }, 6000);
    }
  };

  return (
    <>
      <video ref={videoRef} type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <button
        className="pt-32 pb-36 pl-16 pr-16"
        onClick={handleButtonClick}
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      ></button>
    </>
  );
};

export default LightBulb;
