# apm-mimas

Takes an endpoint from APM's Images API and turns it into an &lt;img /> or &lt;amp-img /> object with srcset.

## Installation

Simply run the command `npm i apm-mimas` or `yarn add apm-mimas`.

## Usage

In files where you want to use the Image component, put `import { Image } from 'apm-mimas'` at the top of your file.
To use the AmpImage component, use `import { AmpImage } from 'apm-mimas'`.

## Available Properties

- _image_: a JSON image object returned from APM's Images API
- _aspectRatio_: used to specify which size of image you'd like returned from the API. Useless for other types of images
- _alt_: set the image's `alt` attribute. Will override the automatic value of image.short_caption if applicable
- _elementClass_: provide a custom `className` to this object, for use in styling, custom JavaScript, and so on
- _fallbackSrcSet_: provide an alternative `srcset` attribute if you're not using the Images API
- _fallbackSrc_: provide an alternative `src` attribute if you're not using the Images API.
- _sizes_: provide guildelines for what the image size should be depending on various media queries
