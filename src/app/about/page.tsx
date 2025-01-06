'use client'
import Header from '@/components/pages/mainHeader'
import Sideleft from '@/components/pages/side-left'
import Sideright from '@/components/pages/side-right'
import Link from 'next/link'

export default function About() {
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
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: 'relative' }}
          >
            <Header />
          </div>
          <div className="flex flex-col w-full container pt-20 p-4">
            <div>
              <h1 className="text-6xl font-bold dark:text-white text-black">
                about<span className="text-primary">( ) &#123;</span>
              </h1>
            </div>
            <div className="pt-10">
              <h3 className="text-2xl text-black dark:text-white">
                Download my{' '}
                <button
                  className="bg-primary text-blackgrey rounded-full py-1 p-4 pb-2"
                  onClick={handleDownload}
                >
                  resume
                </button>
              </h3>
            </div>
            <div className="pt-10">
              <h3 className="text-2xl text-black dark:text-white">
                I&#39;m a{' '}
                <span className="text-primary">full-stack developer</span> with
                a passion for <span className="text-primary">design</span> and{' '}
                <span className="text-primary">technology</span>.
              </h3>
              <br />
              <span className="text-xl text-black dark:text-white">
                &#47;&#47; 8 years of experience
              </span>
            </div>
            <h3 className="text-2xl pt-20 text-black dark:text-white">
              Main Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  Frontend Development,
                  <br />
                  UX/UI Design
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  JavaScript, CSS,
                  <br />
                  HTML, Vue, React
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Photoshop,
                  <br />
                  Illustrator,
                  <br />
                  Unity
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Linux,
                  <br />
                  Server Management
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  E-Commerce,
                  <br />
                  Magento,
                  <br />
                  WordPress,
                  <br />
                  PrestaShop
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Graphic design,
                  <br />
                  Game design
                </p>
              </div>
            </div>

            <h3 className="text-2xl pt-20 text-black dark:text-white">Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  Vue,
                  <br />
                  React,
                  <br />
                  Unity,
                  <br />
                  Blender,
                  <br />
                  Docker
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Node.JS,
                  <br />
                  npm,
                  <br />
                  Git,
                  <br />
                  Rest API,
                  <br />
                  PHP
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Photoshop,
                  <br />
                  Illustrator,
                  <br />
                  Adobe XD &#47; Figma,
                  <br />
                  SVG,
                  <br />
                  Canvas
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  Pencil & Paper,
                  <br />
                  Drawing Tablet
                </p>
              </div>
            </div>

            <h3 className="text-2xl pt-20 text-black dark:text-white">
              Experience
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-500 dark:text-gray-300">
              <div className="col-span-1">
                <p>
                  <span className="text-primary">Backend Development</span>
                  <br />
                  at <span className="text-red-500">VR-Assets (WIP)</span>
                  <br />
                  2019 - present
                </p>
              </div>
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
                  <span className="text-primary">Head of Game Development</span>
                  <br />
                  &lt;&#47;unknown&gt;
                  <br />
                  2016 - 2019
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
                <span className="text-primary">&#125;</span>
              </h1>
            </div>
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  )
}
