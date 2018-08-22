import { equal, deepEqual } from 'zoroaster/assert'
import Context from '../context'
import ALaContext from '../../src'

/** @type {Object.<string, (c: Context, a: ALaContext)>} */
const T = {
  context: [Context, ALaContext],
  'is a function'() {
    equal(typeof Context, 'function')
  },
  async 'returns result with single rule'(
    { emRule, emData, testData }, { stream },
  ) {
    const { result } = await stream(emRule, emData)
    equal(result, `<em>${testData}</em>`)
  },
  async 'returns result with multiple rules'(
    { emRule, emData, testData, strongData, strongRule }, { stream },
  ) {
    const data = `${emData}\n${strongData}`
    const rules = [emRule, strongRule]
    const { result } = await stream(rules, data)
    const expected = `<em>${testData}</em>\n<strong>${testData}</strong>`
    equal(result, expected)
  },
  async 'returns events with single rule'(_, { stream }) {
    const rule = {
      re: /(.*)/,
      replacement(match, data) {
        this.emit('match', data)
        return match
      },
    }
    const d = 'test-data'
    const { events } = await stream(rule, d, ['match'])
    deepEqual(events, { match: [d] })
  },
  async 'returns events with multiple rules'(_, { stream }) {
    const rule = {
      re: /(.*)/,
      replacement(match, data) {
        this.emit('match', data)
        return match
      },
    }
    const rule2 = {
      re: /(.*)/,
      replacement(match, data) {
        this.emit('match2', data)
        return match
      },
    }
    const d = 'test-data'
    const rules = [rule, rule2]
    const { events } = await stream(rules, d, ['match', 'match2'])
    deepEqual(events, { match: [d], match2: [d] })
  },
  async 'allows to access the instance'(_, { stream }) {
    const rule = {
      re: /(.*)/,
      replacement(match, data) {
        this.match = this.match || []
        this.match.push(data)
        return match
      },
    }
    const d = 'test-data'
    const { replaceable } = await stream(rule, d)
    deepEqual(replaceable.match, [d])
  },
  async 'allows to set config'(_, { stream, setConfig }) {
    let config
    const c = {
      test: true,
    }
    setConfig(c)
    const rule = {
      re: /(.*)/,
      replacement() {
        config = this.config
      },
    }
    const { replaceable } = await stream(rule, 'test')
    deepEqual(config, c)
    deepEqual(replaceable.config, c)
  },
}

export default T