/**
 * A rule to replace an `export function` statement with `module.exports`.
 */
export const exportFunctionRule = {
  re: / *export function ([$_\w][$_\w\d]*)/gm,
  replacement(_, fn) {
    // async
    this.emit('exports', fn)

    // sync
    this.exports = this.exports || []
    this.exports.push(fn)

    return `module.exports.${fn} = function ${fn}`
  },
}