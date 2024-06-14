"use client";
import React, { useState, useEffect } from "react";

function AvatarStatus() {
  const [status, setStatus] = useState("offline");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(
          `/api/getStatus`
        );
        const data = await response.json();
        const status = data.status;
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStatus();
    // Fetch status every 5 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 10000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  let color = "green";
  if (status === "online") {
    color = "green";
  } else if (status === "idle") {
    color = "yellow";
  } else if (status === "dnd") {
    color = "red";
  } else if (status === "offline") {
    color = "gray";
  }

  const handleClick = () => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 1000);
  };

  return (
    <span
      className="relative flex justify-center items-center"
      onClick={handleClick}
    >
      <img
        className="h-[75px] w-[75px] rounded-md object-cover"
        src="/icon-256.png"
        alt="Faye's Icon"
        width={75}
        height={75}
      />
      {showText && (
        <span
          className={`absolute left-0 bottom-0.5 block h-4 w-4 rounded-full bg-${color}`}
        >
          <p className="absolute w-[100px] translate-x-[-70%] translate-y-[-80%]">
            boop :3
          </p>
        </span>
      )}
      <span
        className={`absolute left-0 bottom-0.5 block h-4 w-4 rounded-full bg-${color}`}
      />
    </span>
  );
}

export default AvatarStatus;
