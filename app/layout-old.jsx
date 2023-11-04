"use client";
import "../styles/globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";

import useClickSound from "@/hooks/click";
import useDarkMode from "@/components/useDarkMode";

const metadata = {
  title: "Faye | Portfolio",
  description:
    "Faye's personal portfolio website. A place to showcase my projects and skills.",
  url: "https://fayevr.dev",
  image: "icon-512.png",
  icon: "icon-512.png",
  keywords: [
    "faye",
    "fayevr",
    "fayevr.dev",
    "faye vr",
    "portfolio",
    "website",
    "personal",
    "personal website",
    "personal portfolio",
  ],
  theme: "#ff4f00",
};

function LoadingScreen() {
  return (
    <>
      <div className="hidden md:flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500 p-10 fadeOut delayed">
        {" "}
        <div className="w-max">
          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
            Welcome to my site! <i className="fas fa-hand-sparkles"></i>
          </h1>
          <img
            src="/icon-256.png"
            alt="Logo"
            className="w-32 h-32 pt-4 mx-auto"
          />
        </div>
      </div>
      <div className="flex md:hidden min-h-screen items-center justify-center">
        <div className="w-32 h-32 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/icon-256.png"
              alt="Logo"
              className="w-32 h-32 pt-4 mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  const [handleMouseClick] = useClickSound();
  const [isLoading, setIsLoading] = useState(true);
  const [colorTheme, setTheme] = useDarkMode();

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("fadeOut");
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="theme-color" content={metadata.theme} />
        <meta name="image" content={metadata.image} />
        <meta name="icon" content={metadata.icon} />
        <style>
          {`.fadeOut {
            animation-name: fadeOut;
            animation-duration: 1s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
            opacity: 1;
          }`}
        </style>
      </head>
      <body
        className={`bg-white dark:bg-black ${inter.className}`}
        onMouseDown={handleMouseClick}
        onMouseUp={handleMouseClick}
      >
        {/*isLoading ? <LoadingScreen /> : children*/}
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.remove('fadeOut');`,
          }}
        />
      </body>
    </html>
  );
}