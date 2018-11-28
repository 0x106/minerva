### Javascript

##### Webworkers

1. JS is single threaded: there's just one guy doing everything! Even if you're code runs async, it just means he might read a book while he cooks, rather than waiting till he's finished cooking to read.
2. _Webworkers_ let you give him a friend! A webworker is a separate file that executes code you pass it on a separate thread.

```Javascript
// main.js
// https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js

let worker = new Worker("worker.js");

worker.postMessage( "Hello" );

worker.onmessage = function( evt ) {
		let result = evt.data;
		console.log(`Main (worker.onmessage): ${result}`);
}

```


```Javascript
// worker.js
//
// todo!
```


##### Advanced JS

--> Taken from https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md

**Event delegation**

Add an event listener to a parent element - any children that fire events will pass it up the DOM. This is beneficial as you only need a single listener and don't have to manage listeners for child elements that are added or removed.

**Explain `this`**

`this` completely depends on the context that it was called. Note that ES6 arrow functions change how `this` is applied.

1. if `new` is used then inside the function `this` is a new object
2. if `apply`, `call`, or `bind` are used then `this` refers to the object that was passed in as a parameter.
3. if the function is called 'free' then this refers to the global object (if it is es6 then it receives the surrounding scope)
4. if multiple rules then the higher one takes precedence

**Prototypal Inheritance**

Every object has a `prototype` property. If you try and access a property of an object then the engine will search up the prototype tree until it can find something appropriate.

**What is the difference between AMD and CommonJS**

Both are ways of creating modules and importing code - one is sync, the other async.

**Why is this not a valid IIFE? `function foo(){ }();`**

The interpreter considers this to be two separate statements:

1. `function foo(){}`
2. `();`

The solution is to wrap everything in brackets

1. `(function foo(){}()` or
2. `(function foo(){}())` or even
3. `(function ()())` or `( () => {}() )`

(check these)

**What's the difference between `null` `undefined` and undeclared?**


##### Engine + Callstack + Runtime

V8 is a common JS engin, developed by Google, that powers both Chrome and Node.js. The V8 engine consists of two main components: the call stack, and the memory heap.









<!-- end -->
