/**
 *
 * @param {Object} props
 * @return {string}
 */
export const determineAspectRatio = (props) => {
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

/**
 *
 * @param {Object} props
 * @return {string|null}
 */
export const getSrcSet = (props) => {
  if (props.image) {
    if (
      props.image.aspect_ratios &&
      determineAspectRatio(props) in props.image.aspect_ratios &&
      props.image.aspect_ratios[props.aspectRatio] !== null
    ) {
      return generateSrcSet(
        props.image.aspect_ratios[determineAspectRatio(props)].instances
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

/**
 *
 * @param {Object} props
 * @return {Object[]}
 */
export const getInstances = (props) => {
  if (props.image) {
    if (
      props.image.aspect_ratios &&
      determineAspectRatio(props) in props.image.aspect_ratios &&
      props.image.aspect_ratios[props.aspectRatio] !== null
    ) {
      return props.image.aspect_ratios[determineAspectRatio(props)].instances;
    } else if (props.image.preferredAspectRatio) {
      return props.image.preferredAspectRatio.instances;
    }
  }
  return [];
};

/**
 *
 * @param {Object} props
 * @return {string}
 */
export const getSrc = (props) => {
  if (props.image && props.image.fallback) {
    return props.image.fallback;
  } else {
    return props.fallbackSrc;
  }
};

/**
 *
 * @param {Object} props
 * @return {string}
 */
export const getAlt = (props) => {
  if (props.alt) {
    return props.alt;
  } else if (props.image && props.image.short_caption) {
    return props.image.short_caption;
  } else {
    return '';
  }
};

/**
 *
 * @param {Object[]} instances
 * @returns {string}
 */
const generateSrcSet = (instances) => {
  return instances
    .map((instance) => `${instance.url} ${instance.width}w`)
    .join(',');
};
