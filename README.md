Functions chaining library
==========================

[![NPM][npm-image]][npm-url]
[![CircleCI][ci-image]][ci-url]
[![codecov][codecov-image]][codecov-url]
[![GitHub Project][github-image]][github-url]
[![API Documentation][api-docs-image]][api-docs-url]

A `callThru()` function chains several passes. Each pass is a function to call. Each pass produces arguments for the
next function call.

Normally, the value returned from function call is passed as a single argument to the next one:

```typescript
import { callThru } from 'call-thru';

callThru(
    (a, b) => a + b,
    sum => `The sum is ${sum}`
)(2, 9); // The sum is 11
```

Additionally, a pass may return a `NextCall` instance that is responsible for calling the next pass.

There are several `NextCall` implementations available. For example, a `nextArgs()` one can be used to pass multiple
arguments to the next function:
```typescript
import { callThru, nextArgs } from 'call-thru';

callThru(
    (a, b) => nextArgs(b, a),
    (b, a) => [b, a]
)('foo', 'bar'); // ['bar', 'foo']
``` 

A `NextCall` instance is a no-arg function returning itself. Thus it can be chained as a pass:

```typescript
import { callThru, nextArgs } from 'call-thru';

callThru(
    nextArgs('foo', 'bar'),
    (a, b) => [a, b]
)(); // ['foo', 'bar']
```

[npm-image]: https://img.shields.io/npm/v/call-thru.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/call-thru
[ci-image]: https://img.shields.io/circleci/build/github/surol/call-thru?logo=circleci
[ci-url]: https://circleci.com/gh/surol/call-thru
[codecov-image]: https://codecov.io/gh/surol/call-thru/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/surol/call-thru
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/surol/call-thru
[api-docs-image]: https://img.shields.io/static/v1?logo=typescript&label=API&message=docs&color=informational
[api-docs-url]: https://surol.github.io/call-thru/


nextArgs()
----------

Constructs arguments for the next function call.

```typescript
import { callThru, nextArgs } from 'call-thru';

callThru(
    () => nextArgs('foo', 'bar'),
    (a, b) => [a, b]
)(); // ['foo', 'bar']
```


passAsync()
-----------

Constructs asynchronous call chain pass.

```typescript
import { callThru, passAsync } from 'call-thru';

callThru(
    passAsync(),
    () => {
      throw Error('Failed')
    }
)().catch(e => console.log(e));
```


nextEach()
----------

Creates an next call that invokes subsequent passes for each item in the given iterable.

```typescript
import { callThru, nextEach } from 'call-thru';

for (const n of callThru(
    (...args) => nextEach(args),
    n => n * n,
  )(1, 2, 3)) {
  console.log(n); // 1, 4, 9
}
```

This can be combined with e.g. [passIf()]:

```typescript
import { callThru, nextEach, passIf } from 'call-thru';

for (const n of callThru(
    (...args) => nextEach(args),
    passIf((n: number) => n > 1),
    n => n * n,
  )(1, 2, 3)) {
  console.log(n); // 4, 9
}
```


passFlat()
----------

Constructs flattening call chain pass.

The next pass is expected to return an iterable of iterables. This pass then converts it to plain iterable.

```typescript
import { callThru, nextEach, passFlat } from 'call-thru';

for (const n of callThru(
    passFlat(),
    (...args) => nextEach(args),
    n => Array<string>(n).fill(`${n}`)
  )(1, 2)) {
  console.log(n); // '1', '2', '2'
}
```


nextFlatEach()
--------------

Creates a next call that invokes subsequent passes for each item in the given iterable and flattens the result.

The next pass is expected to return an iterable for each of the `items`.

This is an equivalent of `passFlat()` followed by a pass returning `nextEach()`.

```typescript
import { callThru, nextFlatEach } from 'call-thru';

for (const n of callThru(
    (...args) => nextFlatEach(args),
    n => Array<string>(n).fill(`${n}`)
  )(1, 2)) {
  console.log(n); // '1', '2', '2'
}
```

passIf()
--------

[passIf()]: #passif

Constructs conditional call chain pass.

If the given `test` function fails the rest of the passes in chain would be skipped and the final call chain outcome
will be `undefined`. Otherwise the next pass in chain will be called with the same arguments.

```typescript
import { callThru, passIf } from 'call-thru';

const confirmGreater = callThru(
    passIf((a: number, b: number) => a > b),
    () => 'greater'
);

confirmGreater(2, 1); // 'greater'
confirmGreater(1, 2); // undefined
```


nextReturn()
------------

Constructs a next call that skips the rest of the chain and returns the given value.

```typescript
import { callThru, nextReturn } from 'call-thru';

const confirmGreater = callThru(
    (a, b) => a > b ? 'greater' : nextReturn(false),
);

confirmGreater(2, 1); // 'greater'
confirmGreater(1, 2); // false
```


nextSkip()
----------

Constructs a next call that skips the rest of the chain.

This has the same effect as `nextReturn(undefined)`.

```typescript
import { callThru, nextSkip } from 'call-thru';

const confirmGreater = callThru(
    (a, b) => a > b ? 'greater' : nextSkip(),
);

confirmGreater(2, 1); // 'greater'
confirmGreater(1, 2); // undefined
```
