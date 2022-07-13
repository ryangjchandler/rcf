# Ryan's Configuration Language (`rcf`)

This document serves as the specification for my own configuration language. It's really just a mixture of [TOML](https://toml.io) and JSON.

## Overview

Below is an example configuration file that contains essentially all of the `rcf` syntax.

```js
// This is a comment.
// Multi-line comments don't actually exist. You should just place single-line comments after eachother.

// Assignment looks similar to TOML.
name = "Ryan"
age = 100
enabled = false

// The () expression is the unit type in `rcf`. This is comparable to `null` or `None` in other languages.
address = ()

// You can create an array using the familiar [] syntax.
siblings = [
    { name: "John" },
    { name: "Jane" }
]

// Ever wanted your configuration file to be statically-typed?
// Well, you're in luck!
// `rcf` has support for typed values. Prefix the variable with a type and _some_ implementations will run those checks for you.
name: String = "Ryan"

siblings: Array = [
    { name: "John" },
    { name: true }
]
```

## Specification

If you would like a more formal specification for the configuration language, please read through the [SPEC](./SPEC.md) document.

## Why does this exist?

I enjoy writing programming languages. A configuration language is one of the simplest languages you can develop but it can be used in a variety of different scenarios.

The second answer to this question is simply, "Why not?".

## Implementations

* [TypeScript (reference implementation)](./reference/)