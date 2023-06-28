import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";

export default function Doom() {
  return (
    <main className="flex relative w-full h-full overflow-hidden">
    <Sideleft />
    <div className="flex flex-col w-full items-center min-h-[100px]">
      <div className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black" style={{position: "relative"}}>
        <Header />
      </div>
      <div className="flex flex-col w-full items-center pt-10">
        Stuff!
      </div>
      <h1>Press enter or escape to play c:</h1>
    </div>
    <Sideright />
    </main>
  );
}