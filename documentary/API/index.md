
## API

The package is available by importing its default function:

```js
import ALaContext from '@a-la/context'
```

The context is then passed to the `context` property of `zoroaster` tests suites.

```### stream
[
  ["rules", "Rule|Rule[]"],
  ["text", "string"],
  ["eventKeys?", "string[]"]
]
```

Creates a `Replaceable` stream according to a rule or set of rules, asynchronously ends it with passed text and returns the outcome.

In the example below, a transform rule is used to replace an `export` statement with a `module.exports` statement, and emit an `exports` event.

%EXAMPLE: example/src/rule.js%

Now, this rule can be tested using the `@a-la/context` and [`zoroaster`](https://github.com/artdecocode/zoroaster) testing framework.

%EXAMPLE: example/test/spec/default.js, ../../../src => @a-la/context%

%FORK node_modules/.bin/zoroaster -b example/test/spec%

%TYPEDEF types.xml ReturnType%
