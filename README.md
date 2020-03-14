# @a-la/context

[![npm version](https://badge.fury.io/js/%40a-la%2Fcontext.svg)](https://www.npmjs.com/package/@a-la/context)

`@a-la/context` is a a test context for `@a-la` packages used in [`alamode`](https://alamode.cc) transpiler. It will provide a means to record the result of transforms for given rules, as well as emitted events.

```sh
yarn add -E @a-la/context
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async stream(rules: Rule|Rule[], text: string, eventKeys?: string[]): ReturnType`](#async-streamrules-ruleruletext-stringeventkeys-string-returntype)
  * [`ReturnType`](#type-returntype)
- [`setConfig(config: Object)`](#setconfigconfig-object-void)
- [`setFile(file: string)`](#setfilefile-string-void)
- [`setProps(props: !Object)`](#setpropsprops-object-void)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import ÀLaContext from '@a-la/context'
```

The context is then passed to the `context` property of _Zoroaster_ tests suites.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## <code>async <ins>stream</ins>(</code><sub><br/>&nbsp;&nbsp;`rules: Rule|Rule[],`<br/>&nbsp;&nbsp;`text: string,`<br/>&nbsp;&nbsp;`eventKeys?: string[],`<br/></sub><code>): <i>ReturnType</i></code>

Creates a `Replaceable` stream according to a rule or set of rules, asynchronously ends it with passed text and returns the outcome.

In the example below, a transform rule is used to replace an `export` statement with a `module.exports` statement, and emit an `exports` event.

```js
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
```

Now, this rule can be tested using the `@a-la/context` and [`zoroaster`](https://github.com/artdecocode/zoroaster) testing framework.

```js
import { equal, deepEqual } from '@zoroaster/assert'
import ÀLaContext from '@a-la/context'
import { exportFunctionRule as rule } from '../../src/rule'

/** @type {Object.<string, (c: ÀLaContext)>} */
const T = {
  context: ÀLaContext,
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
```

```
example/test/spec
  ✓  replaces the export function

🦅  Executed 1 test.
```

The output of the `stream` function is an object described below.

__<a name="type-returntype">`ReturnType`</a>__: Replaceable instance, string result and events map.

|       Name       |                 Type                 |                       Description                        |
| ---------------- | ------------------------------------ | -------------------------------------------------------- |
| __events*__      | <em>Object&lt;string, any[]&gt;</em> | Emitted events recorded against passed events keys.      |
| __result*__      | <em>string</em>                      | The caught output of a _Replaceable_ stream as a string. |
| __replaceable*__ | <em>Replaceable</em>                 | The instance of a _Replaceable_ stream.                  |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>setConfig</ins>(</code><sub><br/>&nbsp;&nbsp;`config: Object,`<br/></sub><code>): <i>void</i></code>

This method allows to set the `config` property of the _Replaceable_ instance created inside of the `stream` method. Some transform may use `config` for certain functionality, e.g., replacing of the source string in the [`@a-la/import`](https://github.com/a-la/import) transform.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## <code><ins>setFile</ins>(</code><sub><br/>&nbsp;&nbsp;`file: string,`<br/></sub><code>): <i>void</i></code>

Sets the `file` property on the replaceable stream. This is required by the import transform to find the _package.json_ file of the imported module to check whether it has the `alamode` property so that the `esCheck` can be skipped.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>


## <code><ins>setProps</ins>(</code><sub><br/>&nbsp;&nbsp;`props: !Object,`<br/></sub><code>): <i>void</i></code>

Assigns properties to the transform stream. The rules will be able to access them via their `this` context.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://www.artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://www.artd.eco">Art Deco™</a> for <a href="https://alamode.cc">À La Mode</a> 2020</th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>