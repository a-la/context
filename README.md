# @a-la/context

[![npm version](https://badge.fury.io/js/%40a-la%2Fcontext.svg)](https://npmjs.org/package/@a-la/context)

`@a-la/context` is a a test context for `@a-la` packages used in [`alamode`](https://alamode.cc) transpiler. It will provide a means to record the result of transforms for given rules, as well as emitted events.

```sh
yarn add -E @a-la/context
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`stream(rules: Rule|Rule[], text: string, eventKeys?: string[])`](#streamrules-ruleruletext-stringeventkeys-string-void)
    * [`ReturnType`](#returntype)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import ALaContext from '@a-la/context'
```

The context is then passed to the `context` property of `zoroaster` tests suites.

### `stream(`<br/>&nbsp;&nbsp;`rules: Rule|Rule[],`<br/>&nbsp;&nbsp;`text: string,`<br/>&nbsp;&nbsp;`eventKeys?: string[],`<br/>`): void`

Creates a `Replaceable` stream according to a rule or set of rules, asynchronously ends it with passed text and returns the outcome.

`import('restream').Rule` __<a name="rule">`Rule`</a>__

__<a name="returntype">`ReturnType`</a>__: Replaceable instance, string result and events map.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| __events*__ | _Object.<string, any[]>_ | Emitted events recorded against passed events keys. | - |
| __result*__ | _string_ | The caught output of a _Replaceable_ stream as a string. | - |
| __replaceable*__ | _Replaceable_ | The instance of a _Replaceable_ stream. | - |

```js
/* yarn example/ */
import context from '@a-la/context'

(async () => {
  await context()
})()
```

## Copyright

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
