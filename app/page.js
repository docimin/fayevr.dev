import Image from "next/image";
import Header from "../components/header";
import Sideleft from "../components/side-left";
import Sideright from "../components/side-right";
import Breadcrumbs from "../components/breadcrumbs";

export default function Home() {
  return (
    <main className="flex relative w-full h-full overflow-hidden">
      <Sideleft />
      <div className="flex flex-col w-full items-center">
        <Header />
        <Breadcrumbs />
      </div>
      <Sideright />
    </main>
  );
}
