import Header from "../components/pages/header";
import Sideleft from "../components/pages/side-left";
import Sideright from "../components/pages/side-right";

export default function Home() {
  return (
    <main className="flex relative w-full h-full overflow-hidden">
      <Sideleft />
      <div className="flex flex-col w-full items-center min-h-[100px]">
        <div className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black" style={{position: "relative"}}>
          <span
          className="dark:text-white text-black text-2xl font-bold hidden sm:block md:text-xl sm:text-xl"
          style={{
            position: "absolute",
            top: "30%",
            left: "3%",
          }}
          >
            fayevr<span className="text-blurple">.dev( )</span>
          </span>
          <Header />
        </div>
        <div className="flex flex-col w-full items-center pt-4">
          <h1>HELLO</h1>
        </div>
      </div>
      <Sideright />
    </main>
  );
}
