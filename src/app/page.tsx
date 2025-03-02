'use client'
import Header from '@/components/pages/mainHeader'
import SideLeft from '@/components/pages/side-left'
import SideRight from '@/components/pages/side-right'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import TechExperienceVoting from '@/components/techExperienceVoting'
import BoopCounter from '@/components/boopCounter'
import { client } from '@/app/appwrite-client'

type TechItem = {
  id: string
  name: string
  votes: number
}

type Category = {
  id: string
  name: string
  icon: React.ReactNode
  items: TechItem[]
}

export default function Home() {
  const [boopCount, setBoopCount] = React.useState<number>(null)
  const [categories, setCategories] = React.useState<Category[]>([])
  const [userVotes, setUserVotes] = React.useState<
    Record<string, 'up' | 'down' | null>
  >({})

  const handleDownload = () => {
    const pdfUrl = '/files/resume.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  React.useEffect(() => {
    const subscription = client.subscribe(
      [
        'databases.main.collections.counters.documents.mainBoop',
        'databases.main.collections.voting.documents',
      ],
      (response) => {
        if (
          response.channels.includes(
            'databases.main.collections.counters.documents.mainBoop'
          )
        ) {
          setBoopCount(response.payload['boop'])
        } else if (
          response.channels.includes(
            'databases.main.collections.voting.documents'
          )
        ) {
          const updatedDoc = response.payload
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.name === updatedDoc['category']
                ? {
                    ...category,
                    items: category.items.map((item) =>
                      item.id === updatedDoc['$id']
                        ? { ...item, votes: updatedDoc['count'] }
                        : item
                    ),
                  }
                : category
            )
          )
        }
      }
    )
    return () => {
      subscription()
    }
  }, [setBoopCount, setCategories])

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <SideLeft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: 'relative' }}
          >
            <Header />
          </div>
          <div className="flex flex-col w-full container pt-10 p-4">
            <div>
              <h1 className="text-6xl font-bold dark:text-white text-black">
                <span className="text-primary">function</span> about
                <span className="text-primary">( ) </span>&#123;
              </h1>
            </div>
            <div className="pt-10">
              <h3 className="text-2xl text-black dark:text-white">
                Download my{' '}
                <Button
                  className="text-xl rounded-full pt-1"
                  onClick={handleDownload}
                >
                  resume
                </Button>
              </h3>
            </div>
            <div className="py-10">
              <h3 className="text-2xl text-black dark:text-white">
                I&#39;m a{' '}
                <span className="text-primary">full-stack developer</span> with
                a passion for <span className="text-primary">design</span> and{' '}
                <span className="text-primary">technology</span>.
              </h3>
              <span className="text-xl text-black dark:text-white">
                &#47;&#47; 11 years of developing experience
              </span>
            </div>
            <BoopCounter boopCount={boopCount} setBoopCount={setBoopCount} />
            <div className="container mx-auto py-16 px-4 md:px-6">
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Tech Experience Voting
                </h1>
                <p className="text-muted-foreground text-center max-w-2xl">
                  Vote on your favorite frameworks, languages, databases, and
                  tools to help others discover the most popular options.
                </p>
              </div>
              <TechExperienceVoting
                categories={categories}
                setCategories={setCategories}
                userVotes={userVotes}
                setUserVotes={setUserVotes}
              />
            </div>

            <h3 className="text-2xl pt-20 text-black dark:text-white">
              Experience
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  <span className="text-primary">Sysadmin & Developer</span>
                  <br />
                  at{' '}
                  <Link
                    href="https://dutchboxx.nl/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-500"
                  >
                    DUTCHBOXX
                  </Link>
                  <br />
                  2018 - present
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <span className="text-primary">Freelancer</span>
                  <br />
                  &#64;everywhere
                  <br />
                  2014 - present
                </p>
              </div>
            </div>

            <h3 className="text-2xl pt-20 text-black dark:text-white">
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  &#47;&#47; fluent
                  <br />
                  <span className="text-primary italic">en-US</span> English,
                  <br />
                  <span className="text-primary italic">nl-NL</span> Dutch,
                  <br />
                  <span className="text-primary italic">de-DE</span> German
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  &#47;&#47; intermediate
                  <br />
                  <span className="text-primary italic">fr-NL</span> Fryslân
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  &#47;&#47; basic
                  <br />
                  Maybe in the future c:
                </p>
              </div>
            </div>

            <h3 className="text-2xl pt-20 text-black dark:text-white">
              Also busy with
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300 pb-4">
              <div className="col-span-1">
                <p>My dog barking</p>
              </div>
              <div className="col-span-1">
                <p>Headpat</p>
              </div>
              <div className="col-span-1">
                <p>&lt;&#47;LINUX&gt;</p>
              </div>
              <div className="col-span-1">
                <p>Video games</p>
              </div>
              <div className="col-span-1">
                <p>.. work</p>
              </div>
            </div>

            <div>
              <h1 className="text-6xl font-bold pb-20">
                <span>&#125;</span>
              </h1>
            </div>
          </div>
        </div>
        <SideRight />
      </main>
    </div>
  )
}
