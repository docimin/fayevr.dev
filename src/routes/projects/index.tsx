import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/pages/Header'
import SideLeft from '@/components/pages/SideLeft'
import SideRight from '@/components/pages/SideRight'
import { TiltCard } from '@/components/ui/tilt-card'
import { PROJECTS, STATUS_CLASS, sortProjects } from '@/data/projects'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects | Faye' },
      {
        name: 'description',
        content: "Projects I've worked on in the past or current.",
      },
    ],
  }),
  component: Projects,
})

function Projects() {
  const projects = sortProjects(PROJECTS)
  const listRef = useReveal<HTMLDivElement>()

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <SideLeft />
        <div className="flex flex-col w-full items-center min-h-rail">
          <div className="relative flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black">
            <Header />
          </div>
          <div className="flex flex-col w-full container pt-10 p-4">
            <div
              ref={listRef}
              data-reveal
              className="relative rounded-lg border bg-glass p-6 shadow-elevation-2 backdrop-blur-md lg:p-10"
            >
              <h2 className="text-base font-semibold leading-7 text-black dark:text-white">
                All projects
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {projects.map((item) => (
                  <li key={item.name}>
                    <TiltCard className="flex h-full flex-col gap-4 rounded-lg border bg-glass p-6 shadow-elevation-2">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.image || '/images/placeholder.png'}
                          alt={item.name}
                          className="h-10 w-10 shrink-0 rounded-full bg-secondary-foreground"
                        />
                        <div className="flex min-w-0 flex-col">
                          <span className="break-words text-sm font-medium leading-6 dark:text-white text-black">
                            {item.name}
                          </span>
                          <time className="text-xs leading-6 dark:text-gray-400 text-gray-800">
                            {new Date(item.createdAt).toLocaleDateString(
                              'en-GB'
                            )}
                          </time>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-2 text-sm leading-6">
                        <div
                          className={cn(
                            STATUS_CLASS[item.status],
                            'flex-none rounded-full p-1 animate-pulse'
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <div className="dark:text-white text-black">
                          {item.status}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-6">
                        {item.private ? (
                          <div className="font-mono dark:text-gray-400 text-gray-800">
                            Private
                          </div>
                        ) : item.gitRepo ? (
                          <>
                            <div className="font-mono dark:text-gray-400 text-gray-800">
                              <a
                                href={item.gitRepo}
                                className="hover:text-primary"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Repo
                              </a>
                            </div>
                            {item.branch ? (
                              <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium dark:text-gray-400 text-gray-800 ring-1 ring-inset ring-white/10">
                                {item.branch}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="font-mono dark:text-gray-400 text-gray-800">
                            No repo
                          </div>
                        )}
                      </div>

                      <div className="mt-auto text-sm leading-6 text-primary">
                        {item.customUrl || item.gitRepo ? (
                          <a
                            href={item.customUrl || item.gitRepo}
                            className="hover:text-primary"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Visit page --&gt;
                          </a>
                        ) : (
                          <div className="text-gray-400">No link</div>
                        )}
                      </div>
                    </TiltCard>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <SideRight />
      </main>
    </div>
  )
}
