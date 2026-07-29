import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/pages/Header'
import SideLeft from '@/components/pages/SideLeft'
import SideRight from '@/components/pages/SideRight'
import StackShowcase from '@/components/StackShowcase'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/useReveal'

export const Route = createFileRoute('/')({ component: Home })

const panelClass =
  'relative rounded-lg border bg-glass p-6 shadow-elevation-2 backdrop-blur-md md:p-10'

function Home() {
  const heroRef = useReveal<HTMLDivElement>()
  const stackRef = useReveal<HTMLDivElement>()
  const experienceRef = useReveal<HTMLDivElement>()
  const languagesRef = useReveal<HTMLDivElement>()
  const busyRef = useReveal<HTMLDivElement>()

  const handleDownload = () => {
    const pdfUrl = '/files/resume.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <SideLeft />
        <div className="flex flex-col w-full items-center min-h-rail">
          <div className="relative flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black">
            <Header />
          </div>
          <div className="flex flex-col w-full container gap-8 pt-10 p-4">
            <div ref={heroRef} data-reveal className={panelClass}>
              <h1 className="text-6xl font-bold dark:text-white text-black">
                <span className="text-primary">function</span> about
                <span className="text-primary">( ) </span>&#123;
              </h1>
              <div className="pt-10">
                <h3 className="text-2xl text-black dark:text-white">
                  Download my{' '}
                  <Button
                    type="button"
                    className="text-xl rounded-full pt-1"
                    onClick={handleDownload}
                  >
                    resume
                  </Button>
                </h3>
              </div>
              <div className="pt-10">
                <h3 className="text-2xl text-black dark:text-white">
                  I&#39;m a{' '}
                  <span className="text-primary">full-stack developer</span>{' '}
                  with a passion for{' '}
                  <span className="text-primary">design</span> and{' '}
                  <span className="text-primary">technology</span>.
                </h3>
                <span className="text-xl text-black dark:text-white">
                  &#47;&#47; {new Date().getFullYear() - 2014} years of
                  developing experience
                </span>
              </div>
            </div>

            <div ref={stackRef} data-reveal className={panelClass}>
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white">
                  Stack
                </h2>
                <p className="text-muted-foreground text-center max-w-2xl">
                  The frameworks, languages, databases and tools I reach for.
                </p>
              </div>
              <StackShowcase />
            </div>

            <div ref={experienceRef} data-reveal className={panelClass}>
              <h3 className="text-2xl text-black dark:text-white">
                Experience
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
                <div className="col-span-1">
                  <p>
                    <span className="text-primary">Sysadmin & Developer</span>
                    <br />
                    at{' '}
                    <a
                      href="https://dutchboxx.nl/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-500"
                    >
                      DUTCHBOXX
                    </a>
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
            </div>

            <div ref={languagesRef} data-reveal className={panelClass}>
              <h3 className="text-2xl text-black dark:text-white">Languages</h3>
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
            </div>

            <div ref={busyRef} data-reveal className={panelClass}>
              <h3 className="text-2xl text-black dark:text-white">
                Also busy with
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
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
            </div>

            <div>
              <h1 className="text-6xl font-bold pb-20 dark:text-white text-black">
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
