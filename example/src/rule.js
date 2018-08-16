/**
 * A rule to replace an `export function` statement with `module.exports`.
 */
export const exportFunctionRule = {
  re: / *export function ([$_\w][$_\w\d]*)/gm,
  replacement(_, fn) {
    this.emit('exports', fn)
    return `module.exports.${fn} = function ${fn}`
  },
}