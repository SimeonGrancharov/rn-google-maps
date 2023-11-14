import { createIconSetFromFontello } from '@expo/vector-icons'

// Import the config file
import fontelloConfig from '../../config.json'
import { PropsWithoutRef } from 'react'

// Both the font name and files exported from Fontello are most likely called "fontello"
const FontelloIcon = createIconSetFromFontello(
  fontelloConfig,
  'fontello',
  'fontello.ttf'
)

export const Icon = ({
  name,
  ...props
}: { name: 'type2' | 'j1772' | 'ccs2' } & PropsWithoutRef<
  typeof FontelloIcon
>) => {
  return <FontelloIcon name={name} {...props} />
}
