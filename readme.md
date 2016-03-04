# JS Linked Lists

The fundamental data structure in JavaScript is the array, so its functional programming methods (e.g. `Array.prototype.map` and Array.prototype.reduce) are implemented with that in mind. That is, they are implemented iteratively because arrays are iterative structures. Consider the follow snippet from the implementation of `Array.prototype.map` in SpiderMonkey:

```javascript
for (var k = 0; k < len; k++) {
    /* Step b */
    if (k in O) {
        /* Step c.i-iii. */
        var mappedValue = callContentFunction(callbackfn, T, O[k], k, O);
        _DefineDataProperty(A, k, mappedValue);
    }
}
```

Interally, it uses iteration to apply the callback function to each member of the array. This is perfectly fine for dealing with arrays, again, because they're iterative structures. However, functional programmers in JavaScript desire to avoid iteration as it necessarily employs assignment, which is not allowed in pure functional programming languages. Without iteration, the only way to traverse data structures is with recursion, so it makes sense to use a recursive data structure as the fundamental type. As a result, virtually all functional programming languages (Haskell and Elixir are the two that I have the most experience with) use linked lists by default.

This library aims to implement most operations on lists, namely those in Elixir's Enum API and JavaScript's Underscore package, so that functional programmers can unlock the full power of functional programming in JavaScript, without settling for a hack-ier solution.

# Examples:

```javascript

const ll = require('./index.js');

const list = ll.create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Calculate the standard deviation of list
const mean = ll.reduce(list, (i, acc) => i + acc, 0) / ll.length(list);

const means   = ll.map(list, (i) => i - mean);
const squares = ll.map(means, (i) => i * i);
const sum     = ll.reduce(squares, (i, acc) => i + acc, 0);
const stddev  = Math.sqrt(sum / (ll.length(list) - 1));
```
