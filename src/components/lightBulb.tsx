'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

const LightBulb = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const videoRef = useRef(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    videoRef.current.src =
      resolvedTheme === 'light' ? '/files/lightoff.mp4' : '/files/lighton.mp4'
    videoRef.current.load()
  }, [resolvedTheme])

  const handleButtonClick = () => {
    const video = videoRef.current

    if (video.paused) {
      video.play()

      // Disable button
      setIsButtonDisabled(true)

      // Log current theme
      console.log(resolvedTheme)

      // Change theme after 6 seconds
      const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
      setTimeout(() => {
        setTheme(newTheme)
      }, 6150)

      // Change video after 10 seconds
      setTimeout(() => {
        video.src =
          newTheme === 'light' ? '/files/lightoff.mp4' : '/files/lighton.mp4'
        video.load()

        // Re-enable button
        setIsButtonDisabled(false)
      }, 10000) // Changed the delay to 10 seconds
    }
  }

  return (
    <>
      <video ref={videoRef} className="w-full h-full object-cover">
        Your browser does not support the video tag.
      </video>
      <button
        className="pt-32 pb-36 pl-16 pr-16 dark:text-white text-black"
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
        disabled={isButtonDisabled}
      ></button>
    </>
  )
}

export default LightBulb
