# `@apmg/mimas`

[![NPM Stable Release](https://badgen.net/npm/v/@apmg/mimas)](https://www.npmjs.com/package/@apmg/mimas)
[![MIT License](https://badgen.net/badge/license/MIT/blue)](https://github.com/apmg/apm-mimas/blob/master/LICENSE.md)

`@apmg/mimas` is a small library that takes an endpoint from American Public Media's internal image API and turns it into a valid `<img />` or `<amp-img />` object with a `srcset` and proper sizing. This library is used on its own and in our other component libraries, such as [Titan](http://github.com/APMG/titan) and [Amat React](http://github.com/APMG/amat-react).

## Installation

Simply run the command `yarn add @apmg/mimas` or `npm i @apmg/mimas`.

## Usage

In files where you want to use the `<Image />` component, `import { Image } from '@apmg/mimas'` at the top of your file. On pages that need to be compliant with Google's AMP (which we here at MPR _adore_ and think is _great_), import `AmpImage` instead in the same manner.

For example, this:

```javascript
import Image from './Image'
import { imageData } from './__tests__/data/image'

<Image image={imageData} aspectRatio='widescreen' />
```

Will produce a large widescreen image in the app at the appropriate size for the viewport, presuming that the data fed into the `image` property looked like this.

```javascript
const imageWithPreferred = {
  preferredAspectRatio: {
    instances: [
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
    ],
    slug: 'square'
  },
  aspect_ratios: {
    normal: {
      instances: [
        {
          width: 400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/normal/fa6aa0-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 301
        },
        {
          width: 600,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/normal/00b407-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 451
        },
        {
          width: 1000,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/normal/10ac72-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 752
        },
        {
          width: 1400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/normal/6e721c-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1053
        },
        {
          width: 2000,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/normal/f49c92-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1504
        }
      ],
      slug: 'normal'
    },
    square: {
      instances: [
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
      ],
      slug: 'square'
    },
    thumbnail: {
      instances: [
        {
          width: 120,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/thumbnail/e8796f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 90
        },
        {
          width: 300,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/thumbnail/dfad0f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 226
        }
      ],
      slug: 'thumbnail'
    },
    widescreen: {
      instances: [
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
      ],
      slug: 'widescreen'
    },
    portrait: {
      instances: [
        {
          width: 400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/portrait/e6415b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 500
        },
        {
          width: 600,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/portrait/0ebc89-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 750
        },
        {
          width: 1000,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/portrait/fed99c-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1250
        },
        {
          width: 1400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/portrait/523b4b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1750
        },
        {
          width: 1883,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/portrait/766692-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 2354
        }
      ],
      slug: 'portrait'
    },
    uncropped: {
      instances: [
        {
          width: 400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/35bd3b-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 320
        },
        {
          width: 600,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 480
        },
        {
          width: 1000,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/04a63f-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 800
        },
        {
          width: 1400,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/72bc48-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1120
        },
        {
          width: 2000,
          url:
            'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f20034-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
          height: 1600
        }
      ],
      slug: 'uncropped'
    }
  },
  long_caption: 'Serena Brook opens our show at The Town Hall',
  short_caption: 'Serena Brook opens our show at The Town Hall',
  width: 'full',
  preferred_aspect_ratio_slug: 'widescreen',
  id: 'c2c452354fbff94d720ba8f86e2c71ba7427b306',
  credit_url: '',
  type: 'apmImage',
  float: 'none',
  credit: 'American Public Media',
  fallback:
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/uncropped/f5db37-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg',
  srcset:
    'https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/e428bc-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 400w, https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/58b2ba-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 600w, https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/95c885-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1000w, https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/b3a373-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 1400w, https://img.apmcdn.org/c2c452354fbff94d720ba8f86e2c71ba7427b306/widescreen/6ceb83-20181220-serena-brook-opens-our-show-at-the-town-hall.jpg 2000w'
}
```

## Full Documentation

For complete usage details, head to [apm-mimas.github.io/docs](apm-mimas.github.io/docs).
