import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import context from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof context, 'function')
  },
  async 'calls package without error'() {
    await context()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await context({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
