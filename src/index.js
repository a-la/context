import { debuglog } from 'util'

const LOG = debuglog('@a-la/context')

/**
 * A test context for @a-la packages.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function context(config = {}) {
  const {
    type,
  } = config
  LOG('@a-la/context called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
