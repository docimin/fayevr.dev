import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

const LightBulb = () => {
  const { theme, setTheme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = theme === 'light' ? '/files/lightoff.mp4' : '/files/lighton.mp4'
    video.load()
  }, [theme])

  const handleButtonClick = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()

      // Disable button
      setIsButtonDisabled(true)

      // Change theme after 6 seconds
      const newTheme = theme === 'light' ? 'dark' : 'light'
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
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
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
