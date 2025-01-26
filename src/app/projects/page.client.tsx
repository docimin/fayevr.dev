'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getProjects } from '@/lib/server-calls'
import React from 'react'
import { ProjectsDocumentsType } from '@/lib/types/projects'

export default function ProjectsClient() {
  const [projects, setProjects] = React.useState<ProjectsDocumentsType[]>([])

  React.useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects()
      setProjects(data)
    }
    fetchProjects().then()
  }, [])

  const statuses = {
    Ongoing: 'text-yellow-400 bg-yellow-400/10',
    Maintenance: 'text-yellow-400 bg-yellow-400/10',
    Pending: 'text-red-400 bg-red-400/10',
    Completed: 'text-green-400 bg-green-400/10',
    Online: 'text-green-400 bg-green-400/10',
    Error: 'text-rose-400 bg-rose-400/10',
    Paused: 'text-gray-400 bg-gray-400/10',
    Archived: 'text-orange-400 bg-orange-400/10',
  }

  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-sm" />
        </div>
      </td>
      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-sm" />
      </td>
      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-sm" />
      </td>
      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-sm" />
      </td>
      <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 sm:table-cell sm:pr-6 lg:pr-8">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-sm" />
      </td>
    </tr>
  ))

  return (
    <table className="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-2/12" />
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
            className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
          >
            Added at
          </th>
          <th
            scope="col"
            className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
          >
            More info
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray/50 dark:divide-white/20">
        {projects.length
          ? projects
              .sort((a, b) => {
                const statusOrder = Object.keys(statuses)
                const statusComparison =
                  statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
                if (statusComparison !== 0) {
                  return statusComparison
                }
                return a.name.localeCompare(b.name)
              })
              .map((item) => (
                <tr key={item.name}>
                  <td className="py-4 pl-4 pr-8 sm:pl6 lg:pl-8">
                    <div className="flex items-center gap-x-4">
                      <img
                        src={item.imageId || '/images/placeholder.png'}
                        alt={item.name}
                        className="h-8 w-8 rounded-full bg-secondary-foreground"
                      />
                      <div className="truncate text-sm font-medium leading-6 dark:text-white text-black">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      {item.private ? (
                        <div className="font-mono text-sm leading-6 dark:text-gray-400 text-gray-800">
                          Private
                        </div>
                      ) : (
                        <>
                          <div className="font-mono text-sm leading-6 dark:text-gray-400 text-gray-800">
                            <Link
                              href={item.gitRepo}
                              className="hover:text-primary"
                              target="_blank"
                            >
                              Link
                            </Link>
                          </div>
                          <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium dark:text-gray-400 text-gray-800 ring-1 ring-inset ring-white/10">
                            {item.branch}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                      <time className="dark:text-gray-400 text-gray-800 sm:hidden">
                        {item.$createdAt}
                      </time>
                      <div
                        className={cn(
                          statuses[item.status],
                          'flex-none rounded-full p-1 animate-pulse'
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div>
                      <div className="hidden dark:text-white text-black sm:block">
                        {item.status}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 dark:text-gray-400 text-gray-800">
                    <time>
                      {new Date(item.$createdAt).toLocaleDateString('en-GB')}
                    </time>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-primary sm:table-cell sm:pr-6 lg:pr-8">
                    {item.customUrl || item.gitRepo ? (
                      <Link
                        href={item.customUrl || item.gitRepo}
                        className="hover:text-primary"
                        target="_blank"
                      >
                        Visit page --&gt;
                      </Link>
                    ) : (
                      <div className="text-gray-400">No link</div>
                    )}
                  </td>
                </tr>
              ))
          : skeletonRows}
      </tbody>
    </table>
  )
}
