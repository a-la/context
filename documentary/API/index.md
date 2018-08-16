
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

%TYPEDEF types.xml%

%EXAMPLE: example/example.js, ../src => @a-la/context%
