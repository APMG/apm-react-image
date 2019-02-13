import React from 'react';
import { render } from 'react-dom';
import { Image } from './lib';
import { image } from './lib/Image/testdata/image';

const App = () => (
  <div>
    <h1>Hello React</h1>
    <Image
      image={image}
      aspectRatio="square"
      alt="this image is from our test data"
      elementClass="exampleImage"
      sizes="(min-width: 1000px) 1000px" />
  </div>
);

render(<App />, document.getElementById('root'));