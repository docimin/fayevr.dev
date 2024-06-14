import Link from "next/link";

export default function Header() {
  return (
    <>
      <div>
        <div className="pt-4 dark:text-white text-black">
          <Link href={"/"}>
            <button
              type="button"
              className="px-3.5 py-2.5 border-2 mr-4 border-black dark:border-white dark:text-white text-black rounded shadow-button shadow-black dark:shadow-white"
              style={{ transition: "box-shadow 0.2s ease-in-out" }}
            >
              home
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="px-3.5 py-2.5 border-2 border-black dark:border-white dark:text-white text-black rounded shadow-button shadow-black dark:shadow-white"
              style={{ transition: "box-shadow 0.2s ease-in-out" }}
            >
              about
            </button>
          </Link>
          <Link href={"/projects"}>
            <button
              type="button"
              className="px-3.5 py-2.5 border-2 ml-4 border-black dark:border-white dark:text-white text-black rounded shadow-button shadow-black dark:shadow-white"
              style={{ transition: "box-shadow 0.2s ease-in-out" }}
            >
              projects
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
