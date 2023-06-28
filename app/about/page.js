'use client';
import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import Link from "next/link";

export default function About() {
    const handleDownload = () => {
      const pdfUrl = '/files/resume.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black" style={{position: "relative"}}>
            <Header />
          </div>
          <div className="flex flex-col w-full container pt-20 p-4">
            <div>
                <h1 className="text-6xl font-bold">about<span className="text-blurple">( ) &#123;</span></h1>
            </div>
            <div className="pt-10">
                <h3 className="text-2xl">Download my <button className="bg-blurple text-blackgrey rounded-full py-1 p-4 pb-2" onClick={handleDownload}>resume</button></h3>
            </div>
            <div className="pt-10">
                <h3 className="text-2xl">I&#39;m a <span className="text-blurple">full-stack developer</span> with a passion for <span className="text-blurple">design</span> and <span className="text-blurple">technology</span>.</h3>
                <br />
                <span className="text-xl">&#47;&#47; 6 years of experience</span>
            </div>
            <h3 className="text-2xl pt-20">Main Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-300">
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
                        HTML, Vue
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-gray-300">
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

            <h3 className="text-2xl pt-20">Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div className="col-span-1 text-gray-300">
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

            <h3 className="text-2xl pt-20">Experience</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-300">
                <div className="col-span-1">
                    <p>
                        <span className="text-blurple">Backend Development</span>
                        <br />
                        at <Link href="https://vr-assets.net/" target="_blank" rel="noreferrer" className="text-red-500">VR-Assets </Link>
                        <br />
                        2019 - Present
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <span className="text-blurple">Developer & Designer</span>
                        <br />
                        at <Link href="https://dutchboxx.nl/" target="_blank" rel="noreferrer" className="text-red-500">DutchBoxx</Link>
                        <br />
                        2018 - now
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <span className="text-blurple">Head of Game Development</span>
                        <br />
                        &lt;&#47;unknown&gt;
                        <br />
                        2016 - 2019
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <span className="text-blurple">Freelancer</span>
                        <br />
                        &#64;everywhere
                        <br />
                        2014 - now
                    </p>
                </div>
            </div>

            <h3 className="text-2xl pt-20">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-300">
                <div className="col-span-1">
                    <p>
                        &#47;&#47; fluent
                        <br />
                        <span className="text-blurple italic">en-US</span> English,
                        <br />
                        <span className="text-blurple italic">nl-NL</span> Dutch,
                        <br />
                        <span className="text-blurple italic">de-DE</span> German
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        &#47;&#47; intermediate
                        <br />
                        <span className="text-blurple italic">fr-NL</span> Fryslân
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

            <h3 className="text-2xl pt-20">Also busy with</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-gray-300 pb-4">
                <div className="col-span-1">
                    <p>
                        My dog barking
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        &lt;&#47;LINUX&gt;
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        Video games
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        .. work
                    </p>
                </div>
            </div>

            <div>
                <h1 className="text-6xl font-bold pb-20"><span className="text-blurple">&#125;</span></h1>
            </div>
            
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  );
}