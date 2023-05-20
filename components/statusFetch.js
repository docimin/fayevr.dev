'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function AvatarStatus() {
  const [status, setStatus] = useState('offline');

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('https://api1.fayevr.dev/getstatus?member=196742608846979072');
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

  let color = 'green';
  if (status === 'online') {
    color = 'green';
  } else if (status === 'idle') {
    color = 'yellow';
  } else if (status === 'dnd') {
    color = 'red';
  } else if (status === 'offline') {
    color = 'gray';
}

  return (
    <span className="relative flex justify-center items-center">
    <img
        className="h-[75px] w-[75px] rounded-md object-cover"
        src="/icon-256.png"
        alt="Faye's Icon"
        width={75}
        height={75}
    />
      <span className={`absolute left-0 bottom-0.5 block h-4 w-4 rounded-full bg-${color}`} />
    </span>
  );
}

export default AvatarStatus;