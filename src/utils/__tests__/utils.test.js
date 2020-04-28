import { getSrcSet, getInstances, getSrc, getAlt } from '../utils'
import { image, imageWithPreferred } from '../../__testdata__/image'

// test getSrcSet
test('returns null if no image object or fallbackSrcSet is provided', () => {
  let expected = null
  let output = getSrcSet()

  expect(output).toBe(expected)
})

test('returns fallbackSrcSet if no valid srcset can be derived from the image object', () => {
  const expected =
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_1400.jpg 1400w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_700.jpg 700w, https://s3-us-west-2.amazonaws.com/s.cdpn.io/298/wolf_20131015_003_400.jpg 400w'
  let imageData = { whatever: 'info' }
  let props = { image: imageData, fallbackSrcSet: expected }
  let output = getSrcSet(props)

  expect(output).toBe(expected)
})

test("returns the image object's srcset if no aspect ratio is preferred by the image data or the props", () => {
  let expected =
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  let props = { image, fallbackSrcSet: expected }
  let output = getSrcSet(props)

  expect(output).toBe(expected)
})

test('generates the correct srcset if there is a preferred aspect ratio in the image data', () => {
  let expected =
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  let props = { image: imageWithPreferred }
  let output = getSrcSet(props)

  expect(output).toBe(expected)
})

test('prioritizes the aspectRatio prop if there is a preferred aspect ratio in the image data', () => {
  let expected =
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/5ecd52-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/de193e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/7cb7e2-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/822d4e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w,https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/f977a8-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
  let props = { image: imageWithPreferred, aspectRatio: 'square' }
  let output = getSrcSet(props)

  expect(output).toBe(expected)
})

// test getInstances
test('returns empty array if no instances can be found on the image object', () => {
  let expected = []
  let output = getInstances()

  expect(output).toMatchObject(expected)
})

test('returns the instances for the preferred aspect ratio if it can be found in the image data', () => {
  let expected = [
    {
      width: 400,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 225
    },
    {
      width: 600,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 337
    },
    {
      width: 1000,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 562
    },
    {
      width: 1400,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 787
    },
    {
      width: 2000,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 1124
    }
  ]
  let output = getInstances({ image: imageWithPreferred })

  expect(output).toMatchObject(expected)
})

test('returns the instances for a different aspect ratio if another is requested', () => {
  let expected = [
    {
      width: 400,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/5ecd52-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 400
    },
    {
      width: 600,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/de193e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 600
    },
    {
      width: 1000,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/7cb7e2-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 1000
    },
    {
      width: 1400,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/822d4e-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 1400
    },
    {
      width: 2000,
      url:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/square/f977a8-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      height: 2000
    }
  ]
  let output = getInstances({
    image: imageWithPreferred,
    aspectRatio: 'square'
  })

  expect(output).toMatchObject(expected)
})

// test getSrc
test('returns image.fallback if available', () => {
  let output = getSrc({
    image: {
      fallback:
        'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
      fallbackSrc: 'https://www.fillmurray.com/200/300'
    }
  })

  expect(output).toBe(
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg'
  )
})

test('returns fallbackSrc image.fallback is not available', () => {
  let output = getSrc({ fallbackSrc: 'https://www.fillmurray.com/200/300' })

  expect(output).toBe('https://www.fillmurray.com/200/300')
})

// test getAlt
test('returns an empty string if no `alt` can be found on the image data or in the props', () => {
  let output = getAlt()

  expect(output).toMatchObject([])
})

test("returns the short caption on the image if that's available and the `alt` prop is not", () => {
  let output = getAlt({ image })

  expect(output).toBe('Serena Brook opens our show at The Town Hall')
})

test('favors the alt provided in the props if available', () => {
  let output = getAlt({ image, alt: 'i am an alt' })

  expect(output).toBe('i am an alt')
})
