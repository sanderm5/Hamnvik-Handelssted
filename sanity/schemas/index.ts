import section from './objects/section'
import hjem from './documents/hjem'
import historie from './documents/historie'
import servering from './documents/servering'
import kulturformidling from './documents/kulturformidling'
import kontakt from './documents/kontakt'
import arkiv from './documents/arkiv'
import restaurering from './documents/restaurering'
import fjellhoyden from './documents/fjellhoyden'
import referanse from './documents/referanse'
import nyhet from './documents/nyhet'
import programSettings from './documents/programSettings'

export const schemaTypes = [
  // Objects
  section,
  // Singleton pages
  hjem,
  historie,
  servering,
  kulturformidling,
  kontakt,
  arkiv,
  restaurering,
  fjellhoyden,
  // Collections
  referanse,
  nyhet,
  // Settings
  programSettings,
]
