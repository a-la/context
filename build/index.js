const { Replaceable } = require('restream');
const Catchment = require('catchment');
const makeRules = require('@a-la/markers');

/**
 * A context for testing à la transforms which will allow to use its `stream` property.
 */
class ALaContext {
  constructor(file) {
    this.file = file
    this.config = {}
    this.props = null
  }
  /**
   * Create a Replaceable stream with a given rule or rules.
   * @param {Rule|Rule[]} rules A rule or rules to use.
   * @param {string} text The string to feed to the stream.
   * @param {string[]} [eventKeys] Which events to listen to.
   * @returns {ReturnType} Replaceable instance, string result and events map.
   */
  async stream(rules, text, eventKeys = []) {
    if (!text) throw new Error('An input text is required.')

    const { rules: allRules, markers } = makeRules(
      Array.isArray(rules) ? rules : [rules],
    )
    const replaceable = new Replaceable(allRules)
    replaceable.markers = markers
    replaceable.config = this.config
    replaceable.file = this.file
    if (this.props) Object.assign(replaceable, this.props)
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
  /**
   * Set the `.config` property of the Replaceable stream.
   * @param {Object} config
   */
  setConfig(config) {
    this.config = config
  }
  setFile(file) {
    this.file = file
  }
  /**
   * Set properties on the ÀLaMode transform stream.
   * @param {Object<string, *>} props
   */
  setProps(props) {
    this.props = props
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


module.exports = ALaContext