import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Link from 'components/Link';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Image from 'components/Image';
import Section from 'components/Section';
import GalleryImg from 'assets/art/jack_faye_transparent.png';
import GalleryImgLarge from 'assets/art/jack_faye_transparent-large.png';
import { reflow } from 'utils/transition';
import { media } from 'utils/style';
//import { ReactComponent as KatakanaProfile } from 'assets/katakana-profile.svg';
import Heading from 'components/Heading';
import Text from 'components/Text';
import './Gallery.css';

const GalleryText = ({ status, titleId }) => (
  <Fragment>
    <Heading
      className={classNames('gallery__title', `gallery__title--${status}`)}
      level={3}
      id={titleId}
    >
      <DecoderText text="Art, you say?" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text
      className={classNames('gallery__description', `gallery__description--${status}`)}
      size="l"
    >
      This is where all of my Artwork is stashed (if I don't forget to update..). Want to
      check it out? Feel free to click the button below!
    </Text>
    <Text
      className={classNames('gallery__description', `gallery__description--${status}`)}
      size="l"
    >
      I would like to thank <Link href="https://twitter.com/fur_alasky">Alasky</Link> and{' '}
      <Link href="https://twitter.com/AldyDerg">Aldyderg</Link> and of course all the
      other artists for all the wonderful art they made!
    </Text>
  </Fragment>
);

const Gallery = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="gallery"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="gallery__content">
            <div className="gallery__column">
              <GalleryText status={status} titleId={titleId} />
              <Button
                secondary
                className={classNames('gallery__button', `gallery__button--${status}`)}
                href="/gallery"
                icon="menu"
              >
                Visit my gallery!
              </Button>
            </div>
            <div className="gallery__column">
              <div className="gallery__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div
                  className={classNames(
                    'gallery__tag-text',
                    `gallery__tag-text--${status}`
                  )}
                >
                  Gallery
                </div>
              </div>
              <div className="gallery__image-wrapper">
                <Image
                  reveal
                  delay={100}
                  srcSet={`${GalleryImg} 480w, ${GalleryImgLarge} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Animation gif from a friend"
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default Gallery;
