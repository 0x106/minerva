
// ----------------------------------------------------------------------------- //

// In some languages (specifically nominally typed ones) static typing results in 
// unnecessary ceremony because even though you know that the code will work fine 
// the language semantics force you to copy stuff around. This is why stuff like 
// automapper for C# is vital for C#. In TypeScript because we really want it to 
// be easy for JavaScript developers with a minimum cognitive overload, types are 
// structural. This means that duck typing is a first class language construct. 
// Consider the following example. The function iTakePoint2D will accept anything 
// that contains all the things (x and y) it expects:
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
// iTakePoint2D({ x: 0 }); // Error: missing information `y`

// ----------------------------------------------------------------------------- //

function foo(value: string): { a: number, b?: number } {

    if (value === 'astro') {
        return { a: 1, b: 2 };
    }   

    return { a: 1 };
}

console.log(foo('a'))
console.log(foo('astro'))

// ----------------------------------------------------------------------------- //

function toInt(str: string): { value?: number, valid: boolean } {
    const int = parseInt(str);
    if (isNaN(int)) {
        return { valid: false };
    }
    else {
        return { valid: true, value: int };
    }
}

// ----------------------------------------------------------------------------- //


let a = 10
function bar() {
    a = 3
    function baz() {
        console.log('2 - ', a)
    }
    baz()
}
console.log('1 - ', a)
bar()
a = 4
console.log('3 - ', a)