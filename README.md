# @a-la/context

[![npm version](https://badge.fury.io/js/@a-la/context.svg)](https://npmjs.org/package/@a-la/context)

`@a-la/context` is a new Node.js npm package. A test context for @a-la packages.

```sh
yarn add -E @a-la/context
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`context(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)

## API

The package is available by importing its default function:

```js
import context from '@a-la/context'
```

### `context(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example */
import context from '@a-la/context'

(async () => {
  await context()
})()
```

---

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
