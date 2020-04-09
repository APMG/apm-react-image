import React from 'react'
import { render } from '@testing-library/react'
import Image from '..'
import { image, imageWithPreferred } from '../../__data__/image'

// SUCCESSES

test('creates the correct image when properly formatted image data is provided', () => {
  const expected = {
    srcSet:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000',
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  }

  const { getByAltText } = render(<Image image={image} />)

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
})

test('creates the correct image when data specifies which aspect ratio to use', () => {
  const expected = {
    srcSet:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w',
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  }

  const { getByAltText } = render(<Image image={imageWithPreferred} />)

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
})

test('prioritizes the aspectRatio prop over the preferredAspectRatio in the data', () => {
  const expected = {
    srcSet:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w',
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  }

  const { getByAltText } = render(
    <Image image={imageWithPreferred} aspectRatio="widescreen" />
  )

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
})

test('takes in a "sizes" string to specify image behavior based on viewport', () => {
  const expected = {
    sizes: '(min-width: 960px) 720px, 100vw',
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  }

  const { getByAltText } = render(
    <Image
      image={imageWithPreferred}
      aspectRatio="widescreen"
      sizes="(min-width: 960px) 720px, 100vw"
    />
  )

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
  expect(img).toHaveAttribute('sizes', expect.stringContaining(expected.sizes))
})

test('allows you to set the className with the elementClass property', () => {
  const expected = {
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
    class: 'test'
  }

  const { getByAltText } = render(
    <Image
      image={imageWithPreferred}
      elementClass="test"
      aspectRatio="widescreen"
      sizes="(min-width: 960px) 720px, 100vw"
    />
  )

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
  expect(img).toHaveAttribute('class', expect.stringContaining(expected.class))
})

test('creates image when all fallbacks are provided', () => {
  const expected = {
    alt: 'Some nice lawn chairs',
    src:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    srcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  }

  const { getByAltText } = render(
    <Image
      fallbackSrc={expected.src}
      fallbackSrcSet={expected.srcSet}
      alt={expected.alt}
    />
  )

  const img = getByAltText('Some nice lawn chairs')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
  expect(img).toHaveAttribute('alt', expect.stringContaining(expected.alt))
})

test('creates image based on data when all fallbacks are also provided', () => {
  const expected = {
    srcSet:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000',
    src:
      'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
    alt: 'Some nice lawn chairs',
    fallbackSrc:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg',
    fallbackSrcSet:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  }

  const { getByAltText } = render(
    <Image
      image={image}
      fallbackSrc={expected.fallbackSrc}
      fallbackSrcSet={expected.fallbackSrcSet}
    />
  )

  const img = getByAltText('Serena Brook opens our show at The Town Hall')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
})

// FAILURES

test('throws when provided poorly shaped image data', () => {
  let badData = {
    poop:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w',
    alt: 4
  }

  let renderDidFail = false

  try {
    render(<Image image={badData} />)
  } catch {
    renderDidFail = true
  }

  expect(renderDidFail).toBeTruthy()
})

test('throws when when no props are provided', () => {
  let renderDidFail = false

  try {
    render(<Image />)
  } catch {
    renderDidFail = true
  }

  expect(renderDidFail).toBeTruthy()
})
