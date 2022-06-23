import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'components/ProjectLayout';
import Link from 'components/Link';
import usesBackground from 'assets/uses-background.mp4';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import prerender from 'utils/prerender';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import './index.css';
import { Table, TableCell, TableRow } from 'components/Table';

const Uses = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Uses | Faye</title>
        <meta
          name="description"
          content="A list of hardware and software I use to do my thing"
        />
      </Helmet>
      <ProjectContainer className="uses">
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
          entered={!prerender}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis to design and code things. And yeah, that is a Johnny Mnemonic GIF in the background."
        />
        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText>
                <ul>
                  <li>
                    <Link href="https://www.adobe.com/products/photoshop.html">
                      Adobe Photoshop
                    </Link>{' '}
                    is my primary tool for Photo editing these days. Although I don't do a
                    lot of graphical design.
                  </li>
                  <li>
                    Any motion graphics I create are created in Adobe After Effects. So
                    far I haven't found a non-Adobe product that's as good.
                  </li>
                  <li>
                    For any 3D models I use{' '}
                    <Link href="https://www.blender.org/">Blender</Link>. Since 2.8 it's
                    become way simpler to use and in a lot of ways better than expensive
                    paid tools like 3DS Max or Maya.
                  </li>
                </ul>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>
                <ul>
                  <li>
                    I use{' '}
                    <Link href="https://code.visualstudio.com/">Visual Studio Code</Link>{' '}
                    is my primary tool for Coding and Web Development these days. Made the
                    switch from Notepad++ in 2018 and haven't looked back. I've also
                    created <Link href="https://rawpotatochip.com">a website</Link> that I
                    made for a friend, go take a look!
                  </li>
                  <li>Chrome is my main browser for both development and general use.</li>
                  <li>
                    <Link href="https://reactjs.org/">React</Link> is my front end
                    Javascript library of choice. The component-centric mental model is
                    the first thing that truly made sense to me as a designer.
                  </li>
                  <li>
                    For 3D effects and image shaders I use{' '}
                    <Link href="https://threejs.org/">three.js</Link>. It has a bit of a
                    learning curve but you can do some really powerful stuff with it.
                  </li>
                  <li>
                    For CSS I've used a myriad pre-processors and css-in-js solutions like
                    styled-components, but these days I'm using vanilla CSS with{' '}
                    <Link href="https://postcss.org/">PostCSS</Link> to get upcoming CSS
                    features today.
                  </li>
                  <li>
                    For Javascript animations I use{' '}
                    <Link href="https://popmotion.io/api/">Popmotion Pure 8</Link>, it's a
                    great way to add spring animations to three.js. All other animations
                    are CSS with{' '}
                    <Link href="https://reactcommunity.org/react-transition-group/">
                      React Transition Group
                    </Link>{' '}
                    for enter/exit transitions.
                  </li>
                </ul>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Hardware</ProjectSectionHeading>
              <Table>
                <TableRow>
                  <TableCell>
                    <strong>CPU</strong>
                  </TableCell>
                  <TableCell>Intel i9 9900k</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>GPU</strong>
                  </TableCell>
                  <TableCell>ASUS 3080 Ti</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Memory</strong>
                  </TableCell>
                  <TableCell>GSkill 32GB DDR4 3200 MHz</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Motherboard</strong>
                  </TableCell>
                  <TableCell>ASUS ROG STRIX Z390-E Gaming</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Monitor</strong>
                  </TableCell>
                  <TableCell>1440p IPS 144hz LG 27GL850-B</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Keyboard</strong>
                  </TableCell>
                  <TableCell>Steelseries Arctis 7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Mouse</strong>
                  </TableCell>
                  <TableCell>ROG GLADIUS 2 Origin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Laptop</strong>
                  </TableCell>
                  <TableCell>Razer Blade 15 Base (Early 2021)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Headphones</strong>
                  </TableCell>
                  <TableCell>Steelseries /Apple Airpods 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Microphone</strong>
                  </TableCell>
                  <TableCell>Shure SM-7B</TableCell>
                </TableRow>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default Uses;
