import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";

export async function getServerSideProps() {
  const response = await fetch(
    "https://api.github.com/repos/:owner/:repo/commits"
  );
  const commits = await response.json();

  return {
    props: {
      commits,
    },
  };
}

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Ongoing: "text-yellow-400 bg-yellow-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  Paused: "text-gray-400 bg-gray-400/10",
};
const activityItems = [
  {
    project: {
      name: "Suggestions Bot",
      imageUrl:
        "images/suggestionsbot.png",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Ongoing",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    project: {
      name: "Alyx Bot",
      imageUrl:
        "images/alyxbot.png",
    },
    commit: "11464223",
    branch: "main",
    status: "Paused",
    duration: "1m 4s",
    date: "12 hours ago",
    dateTime: "2023-01-23T00:00",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Projects() {
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
              <thead className="border-b border-white/10 dark:border-white/50 text-sm leading-6 text-black dark:text-white">
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
                    Commit
                  </th>
                  <th
                    scope="col"
                    className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Deployed at
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 dark:divide-white/20">
                {activityItems.map((item) => (
                  <tr key={item.project.name}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.project.imageUrl}
                          alt=""
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <div className="truncate text-sm font-medium leading-6 text-white">
                          {item.project.name}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 text-gray-400">
                          {item.commit}
                        </div>
                        <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                          {item.branch}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <time
                          className="text-gray-400 sm:hidden"
                          dateTime={item.dateTime}
                        >
                          {item.date}
                        </time>
                        <div
                          className={classNames(
                            statuses[item.status],
                            "flex-none rounded-full p-1"
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <div className="hidden text-white sm:block">
                          {item.status}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                      {item.duration}
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                      <time dateTime={item.dateTime}>{item.date}</time>
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
