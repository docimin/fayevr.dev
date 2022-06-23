import { lazy, Suspense, Fragment, useMemo } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import { useScrollRestore, useRouteTransition } from 'hooks';
import { Button } from 'components/Button';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectBackground,
  ProjectHeader,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
  ProjectSectionColumns,
} from 'components/ProjectLayout';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import './index.css';
import {
  galleryBackground,
  galleryBackgroundLarge,
  jackfayechip,
  jackfayechipLarge,
  potatostars,
  potatostarsLarge,
  volkiharEnderal,
  volkiharEnderalLarge,
  fayelilein2021,
  fayelilein2021Large,
  FayeHeyAlasky,
  FayeHeyAlaskyLarge,
  FayeHeyAlaskyValentines,
  FayeHeyAlaskyValentinesLarge,
  FayeHeyAlaskyBlush,
  FayeHeyAlaskyBlushLarge,
} from './images.js';

const Carousel = lazy(() => import('components/Carousel'));

const title = 'Gallery';
const description = 'Here is the (not so) massive Gallery of FayeVR and friends.';
//const roles = ['Alasky', 'Aldyderg'];

function Gallery() {
  const { status } = useRouteTransition();
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>{`Projects | ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {(status === 'entered' || status === 'exiting') && (
        <style>{`
          .dark {
            --rgbPrimary: 250 100 20;
            --rgbAccent: 250 100 20;
          }
          .light {
            --rgbAccent: 250 100 20;
          }
        `}</style>
      )}
      <ProjectContainer className="gallery">
        <ProjectBackground
          srcSet={`${galleryBackground} 1000w, ${galleryBackgroundLarge} 1600w`}
          opacity={0.5}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Maybe visit my Twitter?"
          url="https://twitter.com/fayeofficial_"
          //roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionColumns>
            <Image
              srcSet={`${potatostars} 400w, ${potatostarsLarge} 800w`}
              alt="FayeVR Headshot, Artist is Alasky"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
            />
            <div className="gallery__text-section">
              <ProjectSectionHeading>My Headshot!</ProjectSectionHeading>
              <ProjectSectionText>
                I have gotten this piece of masterwork from my friend RawPotatoChip as a
                gift.
              </ProjectSectionText>
              <Button
                secondary
                className={classNames('profile__button', `profile__button--${status}`)}
                href="https://twitter.com/fur_alasky"
                icon="twitter"
              >
                Visit Alasky's Twitter
              </Button>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${jackfayechip} 800w, ${jackfayechipLarge} 1100w`}
              alt="A dark elf wearing the Volkihar Knight armor with the logo overlaid on the image."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent className="gallery__carousel">
            <Suspense fallback={null}>
              <Carousel
                images={useMemo(
                  () => [
                    {
                      src: FayeHeyAlasky,
                      srcSet: `${FayeHeyAlasky} 960w, ${FayeHeyAlaskyLarge} 1920w`,
                      alt: 'Faye in a suit.',
                    },
                    {
                      src: FayeHeyAlaskyValentines,
                      srcSet: `${FayeHeyAlaskyValentines} 960w, ${FayeHeyAlaskyValentinesLarge} 1920w`,
                      alt: 'Faye in a suit with a rose.',
                    },
                    {
                      src: FayeHeyAlaskyBlush,
                      srcSet: `${FayeHeyAlaskyBlush} 960w, ${FayeHeyAlaskyBlushLarge} 1920w`,
                      alt: 'Faye in a suit blushing.',
                    },
                  ],
                  []
                )}
                width={500}
                height={500}
              />
            </Suspense>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection
          backgroundElement={
            <Image
              srcSet={`${volkiharEnderal} 1280w, ${volkiharEnderalLarge} 1920w`}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <Image
                srcSet={`${fayelilein2021} 180w, ${fayelilein2021Large} 320w`}
                alt="Faye IRL and Furry"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 220px`}
                style={{ maxWidth: 220, width: '100%', marginBottom: 30 }}
              />
              <ProjectSectionHeading>Thank you for watching!</ProjectSectionHeading>
              <ProjectSectionText>
                I'm glad you looked through this whole page, If you want to contact me,
                feel free to click the button below! Have a great Day!
              </ProjectSectionText>
              <Button
                secondary
                iconHoverShift
                icon="discord"
                href="https://discord.com/users/196742608846979072"
              >
                Contact me on Discord
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

export default Gallery;
