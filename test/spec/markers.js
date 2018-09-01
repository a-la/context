import { equal, ok } from 'zoroaster/assert'
import ALaContext from '../../src'

/** @type {Object.<string, (a: ALaContext)>} */
const T = {
  context: ALaContext,
  async 'attaches markers to the instance'(
    { stream },
  ) {
    let stringsLength
    const { replaceable } = await stream({
      re: /[\s\S]*/g,
      replacement(match) {
        stringsLength = Object.keys(this.markers.strings.map).length
        return match
      },
    }, 'import test from "test"')
    ok(replaceable.markers)
    equal(stringsLength, 1)
  },
}

export default T