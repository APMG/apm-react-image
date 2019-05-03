import React from 'react';
import PropTypes from 'prop-types';

// Ideally, this component will take in an image object formatted by our images API and spit out an image with a proper srcset. However, I also thought I should provide a couple of fallback options, in case you want to use an image from somewhere else entirely: fallbackSrcSet and fallbackSrc. The last one will just create a normal img tag, so I really don't recommend it.

function generateSrcSet(imageProps, props) {
  let aspectRatio = 'uncropped';

  if (props.image.aspect_ratios) {
    if (props.aspectRatio in props.image.aspect_ratios) {
      aspectRatio = props.aspectRatio;
    }

    props.image.aspect_ratios[aspectRatio].instances.forEach(
      (image, i, dataSet) => {
        let set = `${image.url} ${image.width}w`;
        if (i !== dataSet.length - 1) {
          set = set.concat(',');
        }

        imageProps.srcSet = imageProps.srcSet.concat(set);
        return;
      }
    );
  } else {
    imageProps.srcSet = props.image.srcset;
    return;
  }
}

function generateAttrs(props) {
  let imageProps = {
    srcSet: '',
    src: '',
    alt: ''
  };

  if (props.image) {
    imageProps.src = props.image.fallback;
    if (props.alt) {
      imageProps.alt = props.alt;
    } else {
      imageProps.alt = props.image.short_caption;
    }
    if (props.aspectRatio) {
      generateSrcSet(imageProps, props);
    } else {
      imageProps.srcSet = props.image.srcset;
    }
  } else if (props.fallbackSrcSet) {
    imageProps.srcSet = props.fallbackSrcSet;
    imageProps.src = props.fallbackSrc;
    imageProps.alt = props.alt;
  } else {
    imageProps.src = props.fallbackSrc;
    imageProps.alt = props.alt;
  }

  return imageProps;
}

const Image = (props) => {
  const imageProps = generateAttrs(props);

  return (
    <img
      className={props.elementClass}
      src={imageProps.src}
      alt={imageProps.alt}
      srcSet={imageProps.srcSet}
      sizes={props.sizes}
    />
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    aspect_ratios: PropTypes.shape({
      normal: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      }),
      square: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      }),
      thumbnail: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      }),
      widescreen: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      }),
      portrait: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      }),
      uncropped: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            width: PropTypes.number,
            url: PropTypes.string,
            height: PropTypes.number
          })
        ),
        slug: PropTypes.string
      })
    }),
    long_caption: PropTypes.string,
    short_caption: PropTypes.string,
    width: PropTypes.string,
    preferred_aspect_ratio_slug: PropTypes.string,
    id: PropTypes.string,
    credit_url: PropTypes.string,
    type: PropTypes.string,
    float: PropTypes.string,
    credit: PropTypes.string,
    url: PropTypes.string,
    srcset: PropTypes.string
  }),
  aspectRatio: PropTypes.oneOf([
    'normal',
    'square',
    'thumbnail',
    'widescreen',
    'portrait',
    'uncropped'
  ]),
  elementClass: PropTypes.string,
  fallbackSrcSet: PropTypes.string,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  mustProvideOne: function(props) {
    if (!props['image'] && !props['fallbackSrc']) {
      return new Error(
        'Please provide either a properly formatted image JSON object or an image src'
      );
    }
  },
  mustProvideAlt: function(props) {
    if (!props['image'] && !props['alt'] && props['alt'] !== '') {
      return new Error(
        'Please provide either a properly formatted image JSON object or an image alt'
      );
    }
  },
  mustProvideSrcWithSrcset: function(props) {
    if (!props['image'] && !props['fallbackSrc'] && props['fallbackSrcSet']) {
      return new Error(
        'You cannot provide a fallbackSrcSet without providing a fallbackSrc'
      );
    }
  }
};

Image.defaultProps = {
  elementClass: ''
};

export default Image;
