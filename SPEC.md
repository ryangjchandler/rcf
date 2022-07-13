# Specification

This document contains a more formal specification for Ryan's Configuration Language.

## Grammar

```ts
node = assign | literal
literal = string | number | bool | array | map | unit 

unit = "()"
bool = "true" | "false"
number = /[0-9]+.?[0-9]+/
string = /"[^"]*"/
identifier = /[a-zA-Z_]+/

array = "[" <literal ","*> "]"
map = "{" <identifier | string ":" literal ","? *> "}"
```

> `<>` represents a group.
> `*` means 0 or more of the preceding item.
> `?` means 0 or 1 of the preceding item.
> `/.../` represents a regular expression.

## Types

There are 6 valid types of value in `rcf`.

### `String`

A `String` is simply a UTF-8 string enclosed in double-quotes. It can span multiple lines and those line breaks will be maintained in the resulting value.

### `Number`

The `Number` type is used to represent both integers and 64-bits floating point values.

It is down to the implementation language to distinguish between the two. JavaScript only has a single `number` type which is used as part of the reference implementation.

### `Bool`

This is either `true` or `false`. 

### `()` (unit)

The unit type is used to represent an empty value. This is generally equivalent to `null` in other languages.

### `Array`

An `Array` holds a list of different values. These values **do not** have to be of the same type.

### `Map`

A `Map` is a way of representing key-value pairs of values.

Each key in a `Map` must be either a valid `identifier` as described by the language grammar or a `String` which allows for whitespace characters in the value.

Each value can any type of value as listed above.