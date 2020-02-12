# AmpImage

A component for displaying an image for AMP html, primarily from APM's image API.

## Properties

### image

A JSON endpoint from APM's Image API. If formatted as expected, this component will create the src, srcset, sizes, alt text, and so on and allow you to select the aspectRatio with a single phrase.

### aspectRatio

Allows you to select one of the aspect ratios provided in the image endpoint. Can only be used if the **image** property is provided. Accepts one of the following strings:

- normal
- square
- thumbnail
- widescreen
- portrait
- uncropped

### fallbackSrcSet

Accepts a string with a srcset and overrides any srcset generated with the **image** prop (if applicable).

### fallbackSrc

Accepts a string with a URL and overrides any src set by the **image** prop (if applicable).

### alt

Accepts a string and overrides any alt phrase set by the **image** prop (if applicable).

### sizes

Accepts a string and overrides any size attribute set by the **image** prop (if applicable).
