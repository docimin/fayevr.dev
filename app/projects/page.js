'use client';
import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import Link from "next/link";
import { useEffect, useState } from "react";

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Online: "text-green-400 bg-green-400/10",
  Ongoing: "text-yellow-400 bg-yellow-400/10",
  Maintenance: "text-yellow-400 bg-yellow-400/10",
  Pending: "text-red-400 bg-red-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  Paused: "text-gray-400 bg-gray-400/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://backend.fayevr.dev/api/fayeprojects?populate=*')
      .then(response => response.json())
      .then(data => {
        setProjects(data.data);
      })
      .catch(error => console.error(error));
  }, []);
  
  const activityItems = projects.map(project => ({
    project: {
      name: project.attributes.name, 
      imageUrl: project.attributes.imageurl.data.attributes.formats.thumbnail.url
    },
    gitrepo: project.attributes.gitrepo,
    branch: project.attributes.branch,
    status: project.attributes.status,
    creationdate: project.attributes.creationdate
  }));

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
          <div className="bg-white dark:bg-black py-10 w-full">
            <h2 className="px-4 text-base font-semibold leading-7 text-black dark:text-white sm:px-6 lg:px-8">
              All projects
            </h2>
            <table className="mt-6 w-full whitespace-nowrap text-left">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="border-b border-black/50 dark:border-white/50 text-sm leading-6 text-black dark:text-white">
                <tr>
                  <th
                    scope="col"
                    className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                  >
                    Git Repo
                  </th>
                  <th
                    scope="col"
                    className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray/50 dark:divide-white/20">
                {activityItems.map((item) => (
                  <tr key={item.project.name}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.project.imageUrl}
                          alt=""
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <div className="truncate text-sm font-medium leading-6 dark:text-white text-black">
                          {item.project.name}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-gray-400 text-gray-800">
                          <Link href={item.gitrepo} className="hover:text-blurple">
                            Link
                          </Link>
                        </div>
                        <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium dark:text-gray-400 text-gray-800 ring-1 ring-inset ring-white/10">
                          {item.branch}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <time
                          className="dark:text-gray-400 text-gray-800 sm:hidden"
                        >
                          {item.creationdate}
                        </time>
                        <div
                          className={classNames(
                            statuses[item.status],
                            "flex-none rounded-full p-1"
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <div className="hidden dark:text-white text-black sm:block">
                          {item.status}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-gray-400 text-gray-800 sm:table-cell sm:pr-6 lg:pr-8">
                      <time>{item.creationdate}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  );
}
