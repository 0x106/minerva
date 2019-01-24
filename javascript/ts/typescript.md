### Typescript

Robust JS variant from Microsoft.

https://www.typescriptlang.org/index.html

To install: `$ npm install -g typescript` then `$ tsc main.ts` to transpile from typescript to javascript.

**Tutorials**

1. https://blog.teamtreehouse.com/getting-started-typescript

```
interface Point {
    x: number,
    y: number
}

class Monster {
    name: string;
    initialPosition: Point
    constructor(name, initialPosition) {
        this.name = name;
        this.initialPosition = initialPosition;
    }
}

var scary = new Monster("Alien", {x: 0, y: 0});
```

The above example can also be achieved with the following code:

```
interface Point {
    x: number,
    y: number
}

class Monster {
    constructor(public name: string, public initialPosition: Point) {

    }
}

var scary = new Monster("Alien", {x: 0, y: 0});
```

The `public` keyword instructs the constructor to declare the properties passed as parameters.


###### Handbook

https://www.typescriptlang.org/docs/handbook/basic-types.html

*Types:*

- boolean
- number
- string
- array
- tuple
- enum
- any
- void
- undefined
- null
- never
- object

*Examples:*
- `let helpful: boolean = true;`
- `let decimal: number = 6;`
- `let hex: number = 0xf00d;`
- `let binary: number = 0b1010;`
- `let octal: number = 0o744;`
- `let color: string = "blue";`
- `let list: number[] = [1, 2, 3];`
- `let list: Array<number> = [1, 2, 3];`

```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

```
function warnUser(): void {
    console.log("This is my warning message");
}
```

```
let u: undefined = undefined;
let n: null = null;
```

`never` is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns.

The never type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, never (except never itself). Even any isn’t assignable to never.


`object` is a type that represents the non-primitive type, i.e. any thing that is not `number`, `string`, `boolean`, `symbol`, `null`, or `undefined`.


**type assertions**

```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

These two examples are functionally equivalent. They are used by the compiler and specify that the developer has performed type checks and it can therefore ignore them.




**Typescript Book**

1. https://basarat.gitbooks.io/typescript/content/docs/getting-started.html
2. 





<!-- end -->
