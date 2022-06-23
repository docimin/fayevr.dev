import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Intro from 'pages/Home/Intro';
import ProjectSummary from 'pages/Home/ProjectSummary';
import Profile from 'pages/Home/Profile';
import Gallery from 'pages/Home/Gallery';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import { useLocation } from 'react-router-dom';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import alyxTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import alyxTexture from 'assets/gamestack-login.jpg';
import alyxTextureLarge from 'assets/gamestack-login-large.jpg';
import alyxTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import alyxTexture2 from 'assets/gamestack-list.jpg';
import alyxTexture2Large from 'assets/gamestack-list-large.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import './index.css';

const disciplines = ['Developer', 'Prototyper', 'Animator', 'Programmer', 'Modder'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  const gallery = useRef();
  const projectOne = useRef();
  //const projectTwo = useRef();
  //const projectThree = useRef();
  //const projectFour = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [
      intro,
      details,
      gallery,
      projectOne,
      //      projectTwo,
      //      projectThree,
      //      projectFour,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, details, gallery, projectOne];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Faye | Designer + Developer</title>
        <meta
          name="description"
          content="Portfolio of Faye – a developer working on web &amp; game
          development with a focus on entertainment."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Gallery
        sectionRef={gallery}
        visible={visibleSections.includes(gallery.current)}
        id="gallery"
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Designing the future of VR-Assets"
        description="Designing a platform to help users build better VR content"
        buttonText="View Project"
        buttonLink="/projects/vr-assets"
        model={{
          type: 'laptop',
          alt: 'VR-Assets',
          textures: [
            {
              src: sprTexture,
              srcSet: `${sprTexture} 800w, ${sprTextureLarge} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        //sectionRef={projectTwo}
        //visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Alyx Discord Bot"
        description="Design and development for a discord Reporting bot"
        buttonText="View Project"
        buttonLink="/projects/alyxbot"
        model={{
          type: 'phone',
          alt: 'Alyx Bot',
          textures: [
            {
              src: alyxTexture,
              srcSet: `${alyxTexture} 254w, ${alyxTextureLarge} 508w`,
              placeholder: alyxTexturePlaceholder,
            },
            {
              src: alyxTexture2,
              srcSet: `${alyxTexture2} 254w, ${alyxTexture2Large} 508w`,
              placeholder: alyxTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        //sectionRef={projectThree}
        //visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="IMAGE TITLE WIP"
        description="WIP Description SLICE"
        buttonText="View Project"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'IMAGE ALT WIP',
          textures: [
            {
              src: sliceTexture,
              srcSet: `${sliceTexture} 980w, ${sliceTextureLarge} 1376w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        //sectionRef={projectFour}
        //visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="IMAGE TITLE WIP"
        description="WIP Description SLICE"
        buttonText="View Project"
        buttonLink="/projects/volkihar-knight"
        model={{
          type: 'phone',
          alt: 'Alyx Bot',
          textures: [
            {
              src: alyxTexture,
              srcSet: `${alyxTexture} 254w, ${alyxTextureLarge} 508w`,
              placeholder: alyxTexturePlaceholder,
            },
            {
              src: alyxTexture2,
              srcSet: `${alyxTexture2} 254w, ${alyxTexture2Large} 508w`,
              placeholder: alyxTexture2Placeholder,
            },
          ],
        }}
      />
      <Footer />
    </div>
  );
};

export default Home;
