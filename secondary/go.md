### Go

Go is a statically typed, compiled language

1. https://en.wikipedia.org/wiki/Go_(programming_language)
2. https://golang.org/


##### Introduction

```go

// Need to declare a package that this file belongs to.
// math/rand --> package rand
package main

// need to import packages that are used
import {
  "math"
  "fmt"
}

// parameters:
//    - declare the type after the variable name
//    - if all params are same type then can omit all but last
//  return:
//    - can return any list of values
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

// always need a main func?
func main() {
	fmt.Println(split(17))

  // values that start with a capital are exported from a module
  // math.Pi == valid, math.pi == invalid
  fmt.Println(math.Pi)
}
```

**Variables**

```go
package main

import "fmt"

// all will evaluate to false
var c, python, java bool

// don't need to provide a type if we initialise  
var i, j = 1, 2

func main() {

  // inside a function we can omit the var statement using :=
	k := 3

	fmt.Println(i, c, python, k) // 1, false, false, 3
}
```

```go
// BASIC TYPES
// bool

// string

// int  int8  int16  int32  int64
// uint uint8 uint16 uint32 uint64 uintptr

// byte // alias for uint8

// rune // alias for int32
     // represents a Unicode code point

// float32 float64

// complex64 complex128

// -----------------------------------------------------------------------------

// TYPE CONVERSIONS
func foo() {
  var a int = 2
  b := float32(a)
}

// TYPE INFERENCE
// When the right hand side of the declaration is typed, the new variable is of that same type:

var i int
j := i // j is an int

i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128

// CONST
const World = "世界"
```


##### For Loops

Go has only one looping construct!

```go
package main

import "fmt"

func main() {
	sum := 0

  // no parentheses and the braces are always required
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)

  sum = 1
  // init and post statements are optional
	for ; sum < 1000; {
		sum += sum
	}
	fmt.Println(sum)


  // this means you can drop the semicolons and treat it as a while loop
  sum = 1
  for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)

  // inifinite loop
  for {
    fmt.Println("staahhhppp")
  }
}
```

##### If statements

```go
func sqrt(x float64) string {

  // IF statements are fairly ordinary
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}
```

Can also declare variables in the initialisation block of the `if` statement.
Any variables declared here are only in scope within the block of the statement.

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return v // will fail: [prog.go:12:9: undefined: v]
}

// In this example v will be available inside both the 'if' and 'else' blocks
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	// can't use v here, though
	return lim
}
```

##### Switch

Pretty normal switch, except (thankfully) you don't have to specify `break`, as
execution won't flow through.

```go
func switcheroo() {
  fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.", os)
	}
}


// use the following syntax to replace if else chains
// Note: switch {} --> switch true {}
t := time.Now()
switch {
case t.Hour() < 12:
	fmt.Println("Good morning!")
case t.Hour() < 17:
	fmt.Println("Good afternoon.")
default:
	fmt.Println("Good evening.")
}
```


##### Defer

[Blog post discussing `defer`](https://blog.golang.org/defer-panic-and-recover)

```go
package main

import "fmt"

func main() {

  // arguments are evaulated immediately, but the function itself is not executed
  // until the surrounding function returns
	defer fmt.Println("world")

	fmt.Println("hello")
}
```

##### Pointers

Note that go does not have pointer arithmetic

```go
// a pointer to a value of type int, with default value 'nil'
var p *int

// declare and initialise a value of type int
i := 42

// get the memory address of i and point p to it.
p = &i

// get the value the pointer points to and change it
*p = 21
```









<!-- end -->
