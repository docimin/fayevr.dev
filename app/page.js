import Image from "next/image";
import Header from "../components/header";
import Sides from "../components/sides";
import Breadcrumbs from "../components/breadcrumbs";

export default function Home() {
  return (
    <main className="flex relative w-full h-full overflow-hidden">
      <Sides />
      <div className="flex flex-col w-full items-center">
        <Header />
        <Breadcrumbs />
      </div>
      <Sides />
    </main>
  );
}
