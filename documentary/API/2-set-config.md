```## setConfig
[
  ["config", "Object"]
]
```

This method allows to set the `config` property of the _Replaceable_ instance created inside of the `stream` method. Some transform may use `config` for certain functionality, e.g., replacing of the source string in the [`@a-la/import`](https://github.com/a-la/import) transform.

%~%

```## setFile
[
  ["file", "string"]
]
```

Sets the `file` property on the replaceable stream. This is required by the import transform to find the _package.json_ file of the imported module to check whether it has the `alamode` property so that the `esCheck` can be skipped.

%~%