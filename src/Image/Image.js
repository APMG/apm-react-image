import React from 'react';
import PropTypes from 'prop-types';

// Ideally, this component will take in an image object formatted by our images API and spit out an image with a proper srcset. However, I also thought I should provide a couple of fallback options, in case you want to use an image from somewhere else entirely: fallbackSrcSet and fallbackSrc. The last one will just create a normal img tag, so I really don't recommend it.

const Image = (props) => {
  const determineAspectRatio = () => {
    if (props.aspectRatio) {
      return props.aspectRatio;
    } else if (props.image.preferredAspectRatio) {
      // forces getSrcSet() to use props.image.preferredAspectRatio if it exists, i.e. the function moves on to the next condition,
      // this means that the aspectRatio prop acts as an override if there is a preferred value in the data
      return false;
    } else if (props.image && props.image.preferred_aspect_ratio_slug) {
      return props.image.preferred_aspect_ratio_slug;
    } else {
      return 'uncropped';
    }
  };

  const getSrcSet = () => {
    if (props.image) {
      if (
        props.image.aspect_ratios &&
        determineAspectRatio() in props.image.aspect_ratios &&
        props.image.aspect_ratios[props.aspectRatio] !== null
      ) {
        return generateSrcSet(
          props.image.aspect_ratios[determineAspectRatio()].instances
        );
      } else if (props.image.preferredAspectRatio) {
        return generateSrcSet(props.image.preferredAspectRatio.instances);
      } else {
        return props.image.srcset;
      }
    } else if (props.fallbackSrcSet) {
      return props.fallbackSrcSet;
    } else {
      return null;
    }
  };

  const getSrc = () => {
    if (props.image && props.image.fallback) {
      return props.image.fallback;
    } else {
      return props.fallbackSrc;
    }
  };

  const generateSrcSet = (instances) => {
    return instances
      .map((instance) => `${instance.url} ${instance.width}w`)
      .join(',');
  };

  const getAlt = () => {
    if (props.alt) {
      return props.alt;
    } else if (props.image && props.image.short_caption) {
      return props.image.short_caption;
    } else {
      return '';
    }
  };

  return (
    <img
      className={props.elementClass}
      src={getSrc()}
      alt={getAlt()}
      srcSet={getSrcSet()}
      sizes={props.sizes}
    />
  );
};

const aspectRatioType = PropTypes.shape({
  instances: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    })
  ),
  slug: PropTypes.string
});

Image.propTypes = {
  image: PropTypes.shape({
    preferredAspectRatio: aspectRatioType,
    aspect_ratios: PropTypes.shape({
      normal: aspectRatioType,
      square: aspectRatioType,
      thumbnail: aspectRatioType,
      widescreen: aspectRatioType,
      portrait: aspectRatioType,
      uncropped: aspectRatioType
    }),
    fallback: PropTypes.string,
    long_caption: PropTypes.string,
    short_caption: PropTypes.string,
    width: PropTypes.string,
    preferred_aspect_ratio_slug: PropTypes.string,
    id: PropTypes.string,
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
