'use client';
import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useDarkMode from "@/components/useDarkMode";

export default function Home() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: "relative" }}
          >
            <Header />
          </div>
          <div className="flex flex-col w-full items-center pt-10">
            {colorTheme === "light" ? (
              <SunIcon
                onClick={() => setTheme("light")}
                className="h-6 w-6 text-yellow"
                aria-hidden="true"
              />
            ) : colorTheme === "dark" ? (
              <MoonIcon
                onClick={() => setTheme("dark")}
                className="h-6 w-6 text-yellow"
                aria-hidden="true"
              />
            ) : (
              <MoonIcon
                onClick={() => setTheme("dark")}
                className="h-6 w-6 text-yellow"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  );
}
