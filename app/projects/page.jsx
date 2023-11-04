import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import Client from "./page.client";

export const metadata = {
  title: "Projects",
  description: "Projects I've worked on in the past or current.",
};

export default function Projects() {
  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <Client />
        <Sideright />
      </main>
    </div>
  );
}
