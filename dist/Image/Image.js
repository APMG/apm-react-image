"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// Ideally, this component will take in an image object formatted by our images API and spit out an image with a proper srcset. However, I also thought I should provide a couple of fallback options, in case you want to use an image from somewhere else entirely: fallbackSrcSet and fallbackSrc. The last one will just create a normal img tag, so I really don't recommend it.
function generateSrcSet(imageProps, props) {
  props.image.aspect_ratios[props.aspectRatio].instances.forEach(function (image, i, dataSet) {
    var set = "".concat(image.url, " ").concat(image.width, "w");

    if (i !== dataSet.length - 1) {
      set = set.concat(',');
    }

    imageProps.srcSet = imageProps.srcSet.concat(set);
  });
}

function generateAttrs(props) {
  var imageProps = {
    srcSet: '',
    src: '',
    alt: ''
  };

  if (props.image) {
    imageProps.src = props.image.url;

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

var Image = function Image(props) {
  var imageProps = generateAttrs(props);
  return _react.default.createElement("img", {
    className: props.elementClass,
    src: imageProps.src,
    alt: imageProps.alt,
    srcSet: imageProps.srcSet,
    sizes: props.sizes
  });
};

Image.defaultProps = {
  elementClass: ''
};
var _default = Image;
exports.default = _default;