import React from 'react'
import AvatarStatus from '../statusFetch'
import Link from 'next/link'
import { LightbulbIcon } from 'lucide-react'

const SideRight = () => {
  return (
    <div className="hidden md:flex flex-col">
      <div className="min-w-[100px] min-h-[75px] border-b border-l dark:border-white border-black text-black dark:text-white">
        <AvatarStatus />
      </div>
      <div className="flex flex-col justify-between items-center min-w-[100px] h-full py-3 border-l border-r border-black dark:border-white">
        <svg
          width="100"
          height="485"
          viewBox="0 0 100 485"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:invert"
        >
          <circle cx="50" cy="3" r="2.5" fill="black" stroke="black"></circle>
          <path
            d="M50 3L57.1096 17.6058C83.8835 72.6092 81.212 137.388 50 190V190"
            stroke="black"
            transform="rotate(180 50 96)"
          ></path>
          <path
            d="M50 190L42.8904 204.606C16.1165 259.609 18.788 324.388 50 377V377"
            stroke="black"
            transform="rotate(180 50 283)"
          ></path>
          <circle cx="50" cy="190" r="2.5" fill="white" stroke="black"></circle>
          <circle cx="50" cy="377" r="2.5" fill="black" stroke="black"></circle>
          <path d="M50 377V430" stroke="black"></path>
          <path d="M50 479V485" stroke="black"></path>
          <path d="M50 435V441" stroke="black"></path>
          <path d="M50 446V452" stroke="black"></path>
          <path d="M50 457V463" stroke="black"></path>
          <path d="M50 468V474" stroke="black"></path>
        </svg>
        <svg
          width="100"
          height="400"
          viewBox="0 0 100 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:invert"
        >
          <Link href="/doom">
            <circle cx="50" cy="200" r="6" fill="black"></circle>
          </Link>
          <circle cx="50" cy="184" r="2.5" stroke="black"></circle>
          <circle cx="50" cy="216" r="2.5" stroke="black"></circle>
          <line x1="49.5" y1="174" x2="49.5" y2="75" stroke="black"></line>
          <line x1="49.5" y1="325" x2="49.5" y2="226" stroke="black"></line>
          <line x1="49.5" y1="72" x2="49.5" y2="64" stroke="black"></line>
          <line x1="49.5" y1="61" x2="49.5" y2="53" stroke="black"></line>
          <line x1="49.5" y1="50" x2="49.5" y2="42" stroke="black"></line>
          <line x1="49.5" y1="39" x2="49.5" y2="31" stroke="black"></line>
          <line x1="49.5" y1="28" x2="49.5" y2="20" stroke="black"></line>
          <line x1="49.5" y1="380" x2="49.5" y2="372" stroke="black"></line>
          <line x1="49.5" y1="369" x2="49.5" y2="361" stroke="black"></line>
          <line x1="49.5" y1="358" x2="49.5" y2="350" stroke="black"></line>
          <line x1="49.5" y1="347" x2="49.5" y2="339" stroke="black"></line>
          <line x1="49.5" y1="336" x2="49.5" y2="328" stroke="black"></line>
        </svg>
        <svg
          width="100"
          height="485"
          viewBox="0 0 100 485"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:invert"
        >
          <circle
            cx="50"
            cy="482"
            r="2.5"
            transform="rotate(-180 50 482)"
            fill="black"
            stroke="black"
          ></circle>
          <path
            d="M50 3L57.1096 17.6058C83.8835 72.6092 81.212 137.388 50 190V190"
            stroke="black"
            transform="rotate(180 50 149)"
          ></path>
          <path
            d="M50 190L42.8904 204.606C16.1165 259.609 18.788 324.388 50 377V377"
            stroke="black"
            transform="rotate(180 50 336)"
          ></path>
          <circle
            cx="50"
            cy="295"
            r="2.5"
            transform="rotate(-180 50 295)"
            fill="white"
            stroke="black"
          ></circle>
          <circle
            cx="50"
            cy="108"
            r="2.5"
            transform="rotate(-180 50 108)"
            fill="black"
            stroke="black"
          ></circle>
          <path d="M50 108L50 55" stroke="black"></path>
          <path d="M50 6L50 7.15256e-07" stroke="black"></path>
          <path d="M50 50L50 44" stroke="black"></path>
          <path d="M50 39L50 33" stroke="black"></path>
          <path d="M50 28L50 22" stroke="black"></path>
          <path d="M50 17L50 11" stroke="black"></path>
        </svg>
      </div>
      <div className="min-w-[100px] min-h-[75px] border-l border-t dark:border-white border-black flex items-center justify-center">
        <Link href={'/light'}>
          <LightbulbIcon className="text-2xl text-black dark:text-white" />
        </Link>
      </div>
    </div>
  )
}

export default SideRight
