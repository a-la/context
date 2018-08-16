import { debuglog } from 'util'
import { Replaceable } from 'restream'
import Catchment from 'catchment'

const LOG = debuglog('@a-la/context')

/**
 * A context for testing à la transforms which will allow to use its `stream` property.
 */
export default class ALaContext {
  /**
   * Create a Replaceable stream with a given rule or rules.
   * @param {Rule|Rule[]} rules A rule or rules to use.
   * @param {string} text The string to feed to the stream.
   * @param {string[]} [eventKeys] Which events to listen to.
   * @returns {ReturnType} Replaceable instance, string result and events map.
   */
  async stream(rules, text, eventKeys = []) {
    if (!text) throw new Error('An input text is required.')

    const replaceable = new Replaceable(rules)
    const events = eventKeys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
    eventKeys.forEach((key) => {
      replaceable.on(key, (data) => {
        events[key].push(data)
      })
    })
    const { promise } = new Catchment({
      rs: replaceable,
    })
    replaceable.end(text)
    const result = await promise
    return { events, result, replaceable }
  }
}

/* documentary types.xml */
/**
 * @typedef {import('restream').Rule} Rule
 *
 * @typedef {Object} ReturnType Replaceable instance, string result and events map.
 * @prop {Object.<string, any[]>} events Emitted events recorded against passed events keys.
 * @prop {string} result The caught output of a _Replaceable_ stream as a string.
 * @prop {Replaceable} replaceable The instance of a _Replaceable_ stream.
 */
