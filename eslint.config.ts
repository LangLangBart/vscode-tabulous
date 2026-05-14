/**
 * @file ESLint Setup
 */

import config from 'base-ts-config'

export default config({
  rules: {
    'jsdoc/require-jsdoc': 0,
    'ts/explicit-function-return-type': 0,
    'ts/explicit-module-boundary-types': 0
  }
})
