import React from 'react'
import { render } from '@testing-library/react'
import AmpImage from '..'
import { image, imageWithPreferred } from '../../__data__/image'

// This is basically a more limited selection of the same tests from Image, since the functionality is very similar, but the code is repeated, so they could change independently. I have added checks for those few AMP specific features, such as styles and needing a width and height.

function objectMother() {
  const srcSet =
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000'
  const src =
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  const sizes = '(min-width: 960px) 720px, 100vw'
  const className = 'test'
  const alt = 'Some nice lawn chairs'
  const fallbackSrc =
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg'
  const fallbackSrcSet =
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'

  return {
    src,
    srcSet,
    sizes,
    class: className,
    alt,
    fallbackSrc,
    fallbackSrcSet
  }
}

// SUCCESSES

test('creates the correct AMP image when properly formatted image data is provided', () => {
  const expected = objectMother()

  const { container } = render(<AmpImage image={image} />)

  // getByAltText doesn't work for amp-img? Maybe I can do a PR! :eyes:
  const img = container.firstChild

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.srcSet)
  )
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
})

test('allows you to set the class with the elementClass property', () => {
  const expected = objectMother()

  const { container } = render(
    <AmpImage
      image={imageWithPreferred}
      elementClass="test"
      aspectRatio="widescreen"
      sizes="(min-width: 960px) 720px, 100vw"
    />
  )

  const img = container.firstChild
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', expect.stringContaining(expected.src))
  expect(img).toHaveAttribute('class', expect.stringContaining(expected.class))
})

test('creates image when all fallbacks are provided', () => {
  const expected = objectMother()

  const { container } = render(
    <AmpImage
      fallbackSrc={expected.fallbackSrc}
      fallbackSrcSet={expected.fallbackSrcSet}
      alt={expected.alt}
    />
  )

  const img = container.firstChild
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute(
    'src',
    expect.stringContaining(expected.fallbackSrc)
  )
  expect(img).toHaveAttribute(
    'srcSet',
    expect.stringContaining(expected.fallbackSrcSet)
  )
  expect(img).toHaveAttribute('alt', expect.stringContaining(expected.alt))
})

//// FAILURES

test('throws when provided poorly shaped image data', () => {
  let badData = {
    poop:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w',
    alt: 4
  }

  let renderDidFail = false

  try {
    render(<AmpImage image={badData} />)
  } catch {
    renderDidFail = true
  }

  expect(renderDidFail).toBeTruthy()
})

test('throws when when no props are provided', () => {
  let renderDidFail = false

  try {
    render(<AmpImage />)
  } catch {
    renderDidFail = true
  }

  expect(renderDidFail).toBeTruthy()
})
