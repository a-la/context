import { resolve } from 'path'
import { debuglog } from 'util'
import { Rule } from '../../src'

const LOG = debuglog('@a-la/context')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  /**
   * A replacement rule to transform markdown's `__` into `<em/>`
   * @returns {Rule}
   */
  get emRule() {
    return {
      re: /__([\s\S]+)__/g,
      replacement(match, data) {
        return `<em>${data}</em>`
      },
    }
  }
  /**
   * A replacement rule to transform markdown's `__` into `<em/>`
   * @returns {Rule}
   */
  get strongRule() {
    return {
      re: /\*\*([\s\S]+)\*\*/g,
      replacement(match, data) {
        return `<strong>${data}</strong>`
      },
    }
  }
  /**
   * A string containing text with `__`.
   */
  get emData() {
    return `__${this.testData}__`
  }
  get strongData() {
    return `**${this.testData}**`
  }
  get testData() {
    return 'This is an example of markdown'
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
}
