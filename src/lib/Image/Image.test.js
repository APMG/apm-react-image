import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Image from './Image';
import { image } from './testdata/image';
import 'jest-prop-type-error';

afterEach(cleanup);

// SUCCESSES

test('Creates an img with the correct alt, src, and srcSet when aspectRatio prop is provided', () => {
  const props = {
    aspectRatio: 'widescreen'
  };

  const { container } = render(
    <Image image={image} aspectRatio={props.aspectRatio} />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.publicradio.org/images/20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
});

test('Takes in an optional sizes string, specifying specific image behavior with media queries', () => {
  const props = {
    aspectRatio: 'widescreen',
    sizes: '(min-width: 900px) 1000px'
  };

  const { container } = render(
    <Image image={image} aspectRatio={props.aspectRatio} sizes={props.sizes} />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.publicradio.org/images/20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
  expect(container.firstChild.getAttribute('sizes')).toBe(
    '(min-width: 900px) 1000px'
  );
});

test('Creates an img with the correct alt, src, and srcSet and className when the elementClass property is provided', () => {
  const props = {
    aspectRatio: 'widescreen',
    elementClass: 'testImage'
  };

  const { container } = render(
    <Image
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
    'https://img.publicradio.org/images/20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  );
});

test('Creates an img with the correct alt, src, and defaut srcSet when no aspectRatio prop is provided', () => {
  const { container } = render(<Image image={image} />);

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Serena Brook opens our show at The Town Hall'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://img.publicradio.org/images/20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(image.srcset);
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
    <Image
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
    <Image
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
    'https://img.publicradio.org/images/20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe(image.srcset);
});

test('Creates the a basic img with an empty srcset if only a alt and fallbackSrc are provided', () => {
  const props = {
    alt: 'Some nice lawn chairs',
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  };

  const { container } = render(
    <Image alt={props.alt} fallbackSrc={props.fallbackSrc} />
  );

  expect(container.firstChild.getAttribute('alt')).toBe(
    'Some nice lawn chairs'
  );
  expect(container.firstChild.getAttribute('src')).toBe(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  );
  expect(container.firstChild.getAttribute('srcset')).toBe('');
});

// FAILURES

test('Throws error when image data is not shaped as expected from the API', () => {
  let badData = {
    src:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    srcset:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w',
    alt: 'Who cares? This is not meant to work anyway.'
  };

  expect(() => {
    render(<Image image={badData} />);
  }).toThrow();
});

test('Throws error when none of the following props: image or fallbackSrc, are provided', () => {
  expect(() => {
    render(<Image />);
  }).toThrow();
});

test('Throws error when fallbackSrcSet is provided and fallbackSrc is not', () => {
  const props = {
    alt: 'Some nice lawn chairs',
    fallbackSrcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  };

  expect(() => {
    render(<Image fallbackSrcSet={props.fallbackSrcSet} alt={props.alt} />);
  }).toThrow();
});

test('Throws error when neither a proper image object or alt is provided', () => {
  const props = {
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    fallbackSrcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  };

  expect(() => {
    render(
      <Image
        fallbackSrc={props.fallbackSrc}
        fallbackSrcSet={props.fallbackSrcSet}
      />
    );
  }).toThrow();
});
