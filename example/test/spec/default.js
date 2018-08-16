/* yarn example/ */
import { equal, deepEqual } from 'zoroaster/assert'
import ALaContext from '../../../src'
import { exportFunctionRule as rule } from '../../src/rule'

/** @type {Object.<string, (c: ALaContext)>} */
const T = {
  context: ALaContext,
  async 'replaces the export function'({ stream }) {
    const fn = 'test'
    const data = `export function ${fn}() {}`

    const {
      result,
      events,
      replaceable,
    } = await stream(rule, data, ['exports'])
    const expected = `module.exports.${fn} = function ${fn}() {}`
    equal(result, expected)
    deepEqual(events, {
      exports: [fn],
    })
    deepEqual(replaceable.exports, [fn])
  },
}

export default T