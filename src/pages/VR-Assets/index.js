import { Fragment, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAppContext, useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectTextRow,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectBackground,
  ProjectHeader,
  ProjectSectionColumns,
} from 'components/ProjectLayout';
import ThemeProvider, { useTheme } from 'components/ThemeProvider';
import Image from 'components/Image';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import backgroundVRA from 'assets/vra-background.png';
import backgroundVRALarge from 'assets/vra-background-large.png';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprLessonBuilderLight from 'assets/spr-lesson-builder-light.jpg';
import imageSprLessonBuilderLightLarge from 'assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from 'assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderDark from 'assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderDarkLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprComponentsDark from 'assets/spr-components-dark.png';
import imageSprComponentsDarkLarge from 'assets/spr-components-dark-large.png';
import imageSprComponentsDarkPlaceholder from 'assets/spr-components-dark-placeholder.png';
import imageSprComponentsLight from 'assets/spr-components-light.png';
import imageSprComponentsLightLarge from 'assets/spr-components-light-large.png';
import imageSprComponentsLightPlaceholder from 'assets/spr-components-light-placeholder.png';
import imageSprDesignSystemDark from 'assets/spr-design-system-dark.png';
import imageSprDesignSystemDarkLarge from 'assets/spr-design-system-dark-large.png';
import imageSprDesignSystemDarkPlaceholder from 'assets/spr-design-system-dark-placeholder.png';
import imageSprDesignSystemLight from 'assets/spr-design-system-light.png';
import imageSprDesignSystemLightLarge from 'assets/spr-design-system-light-large.png';
import imageSprDesignSystemLightPlaceholder from 'assets/spr-design-system-light-placeholder.png';
import imageSprStoryboarderDark from 'assets/spr-storyboarder-dark.png';
import imageSprStoryboarderDarkLarge from 'assets/spr-storyboarder-dark-large.png';
import imageSprStoryboarderDarkPlaceholder from 'assets/spr-storyboarder-dark-placeholder.png';
import imageSprStoryboarderLight from 'assets/spr-storyboarder-light.png';
import imageSprStoryboarderLightLarge from 'assets/spr-storyboarder-light-large.png';
import imageSprStoryboarderLightPlaceholder from 'assets/spr-storyboarder-light-placeholder.png';
import imageSprBackgroundVolcanism from 'assets/spr-background-volcanism.jpg';
import imageSprBackgroundVolcanismLarge from 'assets/spr-background-volcanism-large.jpg';
import imageSprBackgroundVolcanismPlaceholder from 'assets/spr-background-volcanism-placeholder.jpg';
import imageSprSchema1Light from 'assets/spr-schema-1-light.png';
import imageSprSchema1LightLarge from 'assets/spr-schema-1-light-large.png';
import imageSprSchema1LightPlaceholder from 'assets/spr-schema-1-light-placeholder.png';
import imageSprSchema1Dark from 'assets/spr-schema-1-dark.png';
import imageSprSchema1DarkLarge from 'assets/spr-schema-1-dark-large.png';
import imageSprSchema1DarkPlaceholder from 'assets/spr-schema-1-dark-placeholder.png';
import imageSprSchema2Light from 'assets/spr-schema-2-light.png';
import imageSprSchema2LightLarge from 'assets/spr-schema-2-light-large.png';
import imageSprSchema2LightPlaceholder from 'assets/spr-schema-2-light-placeholder.png';
import imageSprSchema2Dark from 'assets/spr-schema-2-dark.png';
import imageSprSchema2DarkLarge from 'assets/spr-schema-2-dark-large.png';
import imageSprSchema2DarkPlaceholder from 'assets/spr-schema-2-dark-placeholder.png';
import videoSprMotion from 'assets/spr-motion.mp4';
import videoSprMotionLarge from 'assets/spr-motion-large.mp4';
import videoSprMotionPlaceholder from 'assets/spr-motion-placeholder.jpg';
import './index.css';

const title = 'Designing the future of VR-Assets';
const description =
  'Currently working as a Back End Developer for this Project. We took the platform in a bold new direction, focusing on becoming the most useful market for learning enthusiasts.';
const roles = [
  'Back-End Development',
  'Front-End Development',
  'UX and UI Design',
  'Motion Design',
];

const ProjectVRC = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  const motionSectionRef = useRef();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Helmet>
          <title>{`Projects | ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          srcSet={`${backgroundVRA} 1080w, ${backgroundVRALarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://vr-assets.net/"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={`${
                isDark ? imageSprLessonBuilderDark : imageSprLessonBuilderLight
              } 1280w, ${
                isDark ? imageSprLessonBuilderDarkLarge : imageSprLessonBuilderLightLarge
              } 2560w`}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              In 2019, we began a project to build an entirely new platform to serve as
              the central marketplace for educators, developers and just hobbyists to
              create online VR experiences. The Framework was built for Single-Sellers,
              and there are a number of user experience problems to solve in the process
              of moving the platform to Multi-Vendor. The primary goals for the project
              were reducing barriers to collaboration, and making the platform both easier
              for new users, but with plenty of room to scale for advanced users and
              user-friendly.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={themeId}
              srcSet={`${
                isDark ? imageSprComponentsDark : imageSprComponentsLight
              } 800w, ${
                isDark ? imageSprComponentsDarkLarge : imageSprComponentsLightLarge
              } 1000w`}
              placeholder={
                isDark
                  ? imageSprComponentsDarkPlaceholder
                  : imageSprComponentsLightPlaceholder
              }
              alt={`A set of ${themeId} themed components for the aero design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(themeId)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>The payment system</ProjectSectionHeading>
              <ProjectSectionText>
                Our biggest issue is the payment system that we use, as it's a very large
                project, it was important to lay the foundations with a strong, flexible
                payment system that could evolve during the product’s development cycle.
                This will allow us to accept multiple Payment Methods like Klarna, PayPal,
                Sofort, GiroPay, iDEAL, Cards, etc. and send it directly to the seller.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={`${
                isDark ? imageSprDesignSystemDark : imageSprDesignSystemLight
              } 1280w, ${
                isDark ? imageSprDesignSystemDarkLarge : imageSprDesignSystemLightLarge
              } 2560w`}
              placeholder={
                isDark
                  ? imageSprDesignSystemDarkPlaceholder
                  : imageSprDesignSystemLightPlaceholder
              }
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Design system docs</ProjectSectionHeading>
              <ProjectSectionText>
                A design system is useless if no one knows how to use it, so we put
                together a comprehensive documentation website to cover selling,
                accessibility, uploading and sellers guidelines for designers and
                engineers working with the system.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider themeId="dark">
          <ProjectSection
            ref={motionSectionRef}
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                srcSet={`${imageSprBackgroundVolcanism} 1280w, ${imageSprBackgroundVolcanismLarge} 2560w`}
                placeholder={imageSprBackgroundVolcanismPlaceholder}
                alt="A dramatic ocean scene with lava forming a new land mass."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Motion design</ProjectSectionHeading>
                  <ProjectSectionText>
                    Understanding was a core principle in making the authoring experience
                    a more fun process. Elements animate in ways that indicate the cause
                    and effect of each interaction to improve the fluidity of the overall
                    experience.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
              <Image
                raised
                srcSet={`${videoSprMotion} 1280w, ${videoSprMotionLarge} 2560w`}
                className="spr__video"
                src={videoSprMotionLarge}
                placeholder={videoSprMotionPlaceholder}
                alt="A learning designer building and deploying an interactive lesson on volcanism using the app."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </ProjectSectionColumns>
          </ProjectSection>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Encouraging VR</ProjectSectionHeading>
              <ProjectSectionText>
                A major part of VR-Assets is to provide tools and content for enthusiasts
                to make projects without any issues. This is especially beneficial for
                games like VRChat, ChilloutVR and so on, who would like to create awesome
                Worlds and Avatars.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              raised
              key={themeId}
              srcSet={`${
                isDark ? imageSprStoryboarderDark : imageSprStoryboarderLight
              } 1280w, ${
                isDark ? imageSprStoryboarderDarkLarge : imageSprStoryboarderLightLarge
              } 2560w`}
              placeholder={
                isDark
                  ? imageSprStoryboarderDarkPlaceholder
                  : imageSprStoryboarderLightPlaceholder
              }
              alt="A drag and drop storyboard style editor for creating an adaptive lesson."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Support for everyone!</ProjectSectionHeading>
                <ProjectSectionText>
                  The most powerful aspect of the platform is the ability to upload custom
                  Scripts, Accessories or just Objects for any content, whether it be a
                  World, Avatar, UDON Script, or a full game! Users can give feedback and
                  are able to contact sellers directly through the Website for special
                  requests, errors and Customizations with minimal effort to send
                  messages. Sellers can then come back to you and explain and/or ask for
                  more information to fix or help you.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className="spr__sidebar-images">
              <Image
                className="spr__sidebar-image"
                srcSet={`${isDark ? imageSprSchema2Dark : imageSprSchema2Light} 260w, ${
                  isDark ? imageSprSchema2DarkLarge : imageSprSchema2LightLarge
                } 520w`}
                placeholder={
                  isDark
                    ? imageSprSchema2DarkPlaceholder
                    : imageSprSchema2LightPlaceholder
                }
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className="spr__sidebar-image"
                srcSet={`${isDark ? imageSprSchema1Dark : imageSprSchema1Light} 260w, ${
                  isDark ? imageSprSchema1DarkLarge : imageSprSchema1LightLarge
                } 520w`}
                placeholder={
                  isDark
                    ? imageSprSchema1DarkPlaceholder
                    : imageSprSchema1LightPlaceholder
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectVRC;
