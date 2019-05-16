import { equal, ok } from '@zoroaster/assert'
import ÀLaContext from '../../src'

/** @type {Object.<string, (a: ÀLaContext)>} */
const T = {
  context: ÀLaContext,
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