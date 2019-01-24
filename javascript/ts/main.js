// ----------------------------------------------------------------------------- //
var point2D = { x: 0, y: 10 };
var point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point) { }
iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
// iTakePoint2D({ x: 0 }); // Error: missing information `y`
// ----------------------------------------------------------------------------- //
function foo(value) {
    if (value === 'astro') {
        return { a: 1, b: 2 };
    }
    return { a: 1 };
}
console.log(foo('a'));
console.log(foo('astro'));
// ----------------------------------------------------------------------------- //
function toInt(str) {
    var int = parseInt(str);
    if (isNaN(int)) {
        return { valid: false };
    }
    else {
        return { valid: true, value: int };
    }
}
// ----------------------------------------------------------------------------- //
var a = 10;
function bar() {
    a = 3;
    function baz() {
        console.log('2 - ', a);
    }
    baz();
}
console.log('1 - ', a);
bar();
a = 4;
console.log('3 - ', a);
