"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useDarkMode from "@/components/useDarkMode";
import Link from "next/link";

export default function Home() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div>
      <main className="flex relative w-full h-full">
        <div className="flex flex-col w-full items-center">
          <div style={{ position: "relative" }}>
            {colorTheme === "light" ? (
              <>
                <video>
                  <source src="/files/lighton.mp4" type="video/mp4" />
                  Your browser does not support the video tag. You will have to
                  live with the light off.
                </video>
                <button
                  className="pt-32 pb-36 pl-16 pr-16"
                  onClick={() => {
                    const video = document.querySelector("video");
                    const source = document.querySelector("source");

                    setTimeout(() => {
                      source.src = "/files/lightoff.mp4";
                      video.load();
                    }, 10000);

                    video.play();
                    setTimeout(() => setTheme("light"), 6000);
                    // Disable the button for 10 seconds
                    document.querySelector("button").disabled = true;
                    setTimeout(() => {
                      document.querySelector("button").disabled = false;
                    }, 10000);
                  }}
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                ></button>
              </>
            ) : colorTheme === "dark" ? (
              <>
                <video>
                  <source src="/files/lightoff.mp4" type="video/mp4" />
                  Your browser does not support the video tag. You will have to
                  live with the light on.
                </video>
                <button
                  className="pt-32 pb-36 pl-16 pr-16"
                  onClick={() => {
                    const video = document.querySelector("video");
                    const source = document.querySelector("source");

                    setTimeout(() => {
                      source.src = "/files/lighton.mp4";
                      video.load();
                    }, 10000);

                    video.play();
                    setTimeout(() => setTheme("dark"), 6000);
                    // Disable the button for 10 seconds
                    document.querySelector("button").disabled = true;
                    setTimeout(() => {
                      document.querySelector("button").disabled = false;
                    }, 10000);
                  }}
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                ></button>
              </>
            ) : (
              <>
                <video>
                  <source src="/files/lightoff.mp4" type="video/mp4" />
                  Your browser does not support the video tag. You will have to
                  live with the light on.
                </video>
                <button
                  className="pt-32 pb-36 pl-16 pr-16"
                  onClick={() => {
                    const video = document.querySelector("video");
                    const source = document.querySelector("source");

                    setTimeout(() => {
                      source.src = "/files/lighton.mp4";
                      video.load();
                    }, 10000);

                    video.play();
                    setTimeout(() => setTheme("dark"), 6000);
                    // Disable the button for 10 seconds
                    document.querySelector("button").disabled = true;
                    setTimeout(() => {
                      document.querySelector("button").disabled = false;
                    }, 10000);
                  }}
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                ></button>
              </>
            )}
            <Link href="/">
              <button
                className="px-3.5 py-2.5 border-2 mr-4 border-black dark:border-white rounded shadow-button shadow-black dark:shadow-white text-black dark:text-white"
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  transition: "box-shadow 0.2s ease-in-out",
                }}
              >
                Go home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
