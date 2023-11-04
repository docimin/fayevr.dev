import "@/css/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import ClickSound from "@/hooks/click";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Faye | Portfolio",
    template: "%s | Faye",
  },
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

export default function RootLayout({ children }) {
  return (
    <html className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-full bg-white antialiased dark:bg-black`}
      >
        <Providers>
          <div className="w-full">{children}</div>
        </Providers>
        <ClickSound />
      </body>
    </html>
  );
}
