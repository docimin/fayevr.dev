"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import useClickSound from "../hooks/click";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <div class="hidden md:flex min-h-screen items-center justify-center bg-gradient-to-tr to-blue-400 from-green-500 p-10">
        <div class="w-max">
          <h1 class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
            Welcome to my site! <i class="fas fa-hand-sparkles"></i>
          </h1>
        </div>
      </div>
      <div class="flex md:hidden min-h-screen items-center justify-center">
        <div className="w-32 h-32 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">
          <div class="w-full h-full flex items-center justify-center">
            <img src="/icon-256.png" alt="Logo" class="w-16 h-16 mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  const [handleMouseClick] = useClickSound();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change the time to suit your needs
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
      </head>
      <body
        className={`${inter.className}`}
        onMouseDown={handleMouseClick}
        onMouseUp={handleMouseClick}
      >
        {isLoading ? <LoadingScreen /> : children}
      </body>
    </html>
  );
}
