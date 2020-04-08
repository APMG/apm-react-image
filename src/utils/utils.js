const determineAspectRatio = ({ aspectRatio, image }) => {
  if (aspectRatio) {
    return aspectRatio
  } else if (image.preferredAspectRatio) {
    return false
  } else if (image && image.preferred_aspect_ratio_slug) {
    return image.preferred_aspect_ratio_slug
  } else {
    return 'uncropped'
  }
}

const generateSrcSet = (instances) => {
  return instances
    .map((instance) => `${instance.url} ${instance.width}w`)
    .join(',')
}

export const getSrcSet = (props) => {
  let { image, aspectRatio, fallbackSrcSet } = props

  if (image) {
    if (
      image.aspect_ratios &&
      determineAspectRatio(props) in image.aspect_ratios &&
      image.aspect_ratios[aspectRatio] !== null
    ) {
      return generateSrcSet(
        image.aspect_ratios[determineAspectRatio(props)].instances
      )
    } else if (image.preferredAspectRatio) {
      return generateSrcSet(image.preferredAspectRatio.instances)
    } else {
      return image.srcset
    }
  } else if (fallbackSrcSet) {
    return fallbackSrcSet
  } else {
    return null
  }
}

export const getInstances = (props) => {
  let { image, aspectRatio } = props

  if (image) {
    if (
      image.aspect_ratios &&
      determineAspectRatio(props) in image.aspect_ratios &&
      image.aspect_ratios[aspectRatio] !== null
    ) {
      return image.aspect_ratios[determineAspectRatio(props)].instances
    } else if (image.preferredAspectRatio) {
      return image.preferredAspectRatio.instances
    }
  }
  return []
}

export const getSrc = ({ image, fallbackSrc }) => {
  if (image && image.fallback) {
    return image.fallback
  } else {
    return fallbackSrc
  }
}

export const getAlt = ({ alt, image }) => {
  if (alt) {
    return alt
  } else if (image && image.short_caption) {
    return image.short_caption
  } else {
    return ''
  }
}
