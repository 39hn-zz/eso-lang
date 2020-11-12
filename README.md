# eso-lang

Parse and compile The Elder Scrolls Online's *.lang* files with node.js.

eso-lang is an adaption of [ESOAPPS](https://github.com/uesp/uesp-esoapps)'s EsoLangFile implementation.

## Usage

Include the library:

```javascript
const esolang = require('./index');
```

### Parse

Parse a *.lang* file with

    esolang.parse(Buffer) → Object

### Object structure of parsed records

**Example**

```javascript
[
    { Id: 3427285, Unknown: 0, Index: 3, Offset: 0, Text: 'TEST1' },
    { Id: 3427285, Unknown: 0, Index: 7, Offset: 5, Text: 'TEST2' },
]
```

### Compile

Convert record object to a valid *.lang* file with

    esolang.compile(Object) → Buffer

## License

**GPL v2**