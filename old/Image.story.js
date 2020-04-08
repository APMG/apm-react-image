import React from 'react'
import Image from './Image'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withReadme } from 'storybook-readme'
import readme from './README.md'
import { image } from './testdata/image'

const stories = storiesOf('Atoms/Figure', module)

stories.addDecorator(withKnobs()).addDecorator(withReadme([readme]))

stories.add('Image Endpoint', () => {
  return <Image image={image} />
})

stories.add('Aspect Ratio Square', () => {
  return <Image image={image} aspectRatio="square" />
})

stories.add('Fallback', () => {
  return (
    <Image
      fallbackSrc={text('Example Image Src', 'http://placecorgi.com/800')}
      alt={text('Image Alt Text', 'a good boi')}
    />
  )
})

stories.add('')
