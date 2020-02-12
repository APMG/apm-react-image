import React from 'react';
import { render, cleanup } from 'react-testing-library';
import AmpImage from './AmpImage';
import {
  image,
  imageWithPreferred,
  imageWithoutPreferredSlug
} from './testdata/image';
import 'jest-prop-type-error';

afterEach(cleanup);

test('Creates an img with the correct alt, src, and srcSet, width, height when aspectRatio prop is provided, prioritizes aspectRatio prop over preferred', () => {
  const props = {
    aspectRatio: 'widescreen'
  };

  const { container } = render(
    <AmpImage image={imageWithPreferred} aspectRatio={props.aspectRatio} />
  );

  expect(container).toBeDefined();

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );

  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('225');
});

test('Takes in an optional sizes string, specifying specific image behavior with media queries', () => {
  const props = {
    aspectRatio: 'widescreen',
    sizes: '(min-width: 900px) 1000px'
  };

  const { container } = render(
    <AmpImage
      image={image}
      aspectRatio={props.aspectRatio}
      sizes={props.sizes}
    />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('sizes')).toBe(
    '(min-width: 900px) 1000px'
  );
  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('225');
});

test('Creates an img with the preferred aspect ratio when image.preferredAspectRatio is included and no aspectRatio prop is provided', () => {
  const { container } = render(<AmpImage image={imageWithPreferred} />);

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/5ecd52-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/de193e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/7cb7e2-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/822d4e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/f977a8-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('400');
});

test('Creates an img with the correct alt, src, and srcSet and className when the elementClass property is provided', () => {
  const props = {
    aspectRatio: 'widescreen',
    elementClass: 'testImage'
  };

  const { container } = render(
    <AmpImage
      image={image}
      aspectRatio={props.aspectRatio}
      elementClass={props.elementClass}
    />
  );

  expect(container.firstChild.getAttribute('class')).toBe('testImage');
  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('225');
});

test('Creates an img with the correct alt, src, and "uncropped" srcSet when no aspectRatio prop or image.preferred_aspect_ratio_slug is provided', () => {
  const { container } = render(<AmpImage image={imageWithoutPreferredSlug} />);

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('320');
});

test('Creates an img when an image object is not provided, but a fallbackSrc, fallbackSrcSet and alt are provided', () => {
  const props = {
    alt: 'Some nice lawn chairs',
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    fallbackSrcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  };

  const { container } = render(
    <AmpImage
      alt={props.alt}
      fallbackSrc={props.fallbackSrc}
      fallbackSrcSet={props.fallbackSrcSet}
    />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Some nice lawn chairs'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  );
  expect(container.firstChild.getAttribute('width')).toBe(null);
  expect(container.firstChild.getAttribute('height')).toBe(null);
});

test('Creates the correct img when an image prop and all of the fallbacks are provided (i.e. prioritizes alt prop)', () => {
  const props = {
    alt: 'Some nice lawn chairs',
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    fallbackSrcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  };

  const { container } = render(
    <AmpImage
      image={image}
      alt={props.alt}
      fallbackSrc={props.fallbackSrc}
      fallbackSrcSet={props.fallbackSrcSet}
    />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Some nice lawn chairs'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('width')).toBe('400');
  expect(container.firstChild.getAttribute('height')).toBe('225');
});

test('Creates the a basic img with an empty srcset if only a alt and fallbackSrc are provided', () => {
  const props = {
    alt: 'Some nice lawn chairs',
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  };

  const { container } = render(
    <AmpImage alt={props.alt} fallbackSrc={props.fallbackSrc} />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Some nice lawn chairs'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(null);
  expect(container.firstChild.getAttribute('width')).toBe(null);
  expect(container.firstChild.getAttribute('height')).toBe(null);
});
