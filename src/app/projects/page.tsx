import Sideleft from '@/components/pages/side-left'
import Sideright from '@/components/pages/side-right'
import { getProjects } from '@/lib/server-calls'
import Header from '@/components/pages/mainHeader'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ProjectsClient from '@/app/projects/page.client'

export const metadata = {
  title: 'Projects',
  description: "Projects I've worked on in the past or current.",
}

export const runtime = 'edge'

export default async function Projects() {
  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: 'relative' }}
          >
            <Header />
          </div>
          <div className="bg-white dark:bg-black py-10 w-full">
            <h2 className="px-4 text-base font-semibold leading-7 text-black dark:text-white sm:px-6 lg:px-8">
              All projects
            </h2>
            <ProjectsClient />
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  )
}
