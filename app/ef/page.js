"use client";
import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EF() {
  const [showEnglish, setShowEnglish] = useState(false);

  const handleButtonClick = () => {
    setShowEnglish(true);
  };

  useEffect(() => {
    if (showEnglish) {
      const timer = setTimeout(() => {
        setShowEnglish(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showEnglish]);

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 dark:border-white border-black"
            style={{ position: "relative" }}
          ></div>
          <button
            type="button"
            className="px-3.5 py-2.5 border-2 border-black dark:border-white dark:text-white text-black rounded shadow-button shadow-black dark:shadow-white"
            style={{ transition: "box-shadow 0.2s ease-in-out" }}
            onClick={handleButtonClick}
          >
            English Version
          </button>
          {showEnglish && (
            <span id="english" className="text-red-500 pt-4 text-3xl text-center">
              Sprich deutsch du Hurensohn!
            </span>
          )}
          <div className="flex flex-col w-full items-center pt-10 text-black dark:text-white">
            <h1 id="rainbow" className="text-4xl">Eurofurence Edition</h1>
            <br />
            <span className="text-2xl p-4 text-center">
              Sie müssen schwul sein,
              <br />
              da sie von der Eurofurence stammen!
            </span>
            <span>Schau dir die headpat.de seite an:</span>
            <Link className="text-red-500" href="https://headpat.de">
              https://headpat.de
            </Link>
            <br />
            <br />
            <span>Was machen sie eigentlich noch hier?</span>
            <span>Geben sie bitte faye einen hug!</span>
          </div>
        </div>
      </main>
    </div>
  );
}
