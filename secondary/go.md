### Go

Go is a statically typed, compiled language

1. https://en.wikipedia.org/wiki/Go_(programming_language)
2. https://golang.org/


##### Introduction

Mostly taken from: https://tour.golang.org/

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

##### Structs

Structs are collections of fields

```go

func structure() {
  type Vertex struct {
    X int
	  Y int
  }

  v := Vertex{1, 2}

  // access fields with dot notation
	v.X = 4

  //declare a pointer to the memory address of the struct
  p := &v

  // these are equivalent (don't have to explicitly dereference)
	(*p).X = 1e9
  p.X = 1e6


  v1 := Vertex{1, 2}  // has type Vertex
	v2 := Vertex{X: 1}  // Y:0 is implicit
	v3 := Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex

  // Note the following special syntax
  // var (
  //    a = 1
  //    b = 2
  // )
  // equiv. to a := 1
  //           b := 2

}
```

##### Arrays

Go has pretty ugly array syntax.

```go
var a [10]int

primes := [6]int{2, 3, 5, 7, 11, 13}
```

Arrays cannot be resized, since the length is part of the type. Use `slice` instead

##### slice

A slice is a reference to an array

```go

// note that the syntax is similar to declaring array, but we omit the length

primes := [6]int{2, 3, 5, 7, 11, 13}
var s []int = primes[1:4]

// half open range, includes lower excludes upper
// a[low : high]
```

```go
package main

import "fmt"

func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)

	p := s
	p[1].i = 10
	fmt.Println(p[1])
	fmt.Println(s[1])
}
```

**Omit slice bounds**

```go
var a [10]int
a[0:10]
a[:10]
a[0:]
a[:]
```

**Slice length and capacity**

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

**Dynamically sized arrays with `make`**

```go
func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}
```

Can append to a slice with `func append(s []T, vs ...T) []T`

Can iterate over a slice using `range`

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {

}

// ----------------

pow := make([]int, 10)
for i := range pow {
	pow[i] = 1 << uint(i) // == 2**i
}
for _, value := range pow {
	fmt.Printf("%d\n", value)
}
```


##### Maps!

(i.e a dictionary)

```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])


  var mapLiteral = map[string]Vertex{
  	"Bell Labs": Vertex{
  		40.68433, -74.39967,
  	},
  	"Google": Vertex{
  		37.42202, -122.08408,
  	},
  }

  var otherMapLiteral = map[string]Vertex{
  	"Bell Labs": {40.68433, -74.39967},
  	"Google":    {37.42202, -122.08408},
  }
}
```

Maps come with some nifty syntax

- `m[key] = elem`
- `elem = m[key]`
- `delete(m, key)`
- `elem, ok := m[key]` // if m[key] is present then ok == true, else false


##### Functions

1. Functions are first class, can be passed around
2. Functions can be closures

```go
package main

import "fmt"

// each adder instance references its own copy of sum
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```


##### Methods

- Go does not have classes. However, you can define methods on types.
- A method is a function with a special receiver argument.
- The receiver appears in its own argument list between the func keyword and the method name.
- In this example, the Abs method has a receiver of type Vertex named v.

```go
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

// (v Vertex) is the receiver
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// equiv.
// func Abs(v Vertex) float64 {
// 	return math.Sqrt(v.X*v.X + v.Y*v.Y)
// }

// can declare methods on arbitrary types
type MyFloat float64
func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

// can also declare methods with pointer receivers
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```


##### Interfaces

- An interface type is defined as a set of method signatures.
- A value of interface type can hold any value that implements those methods.
- A type implements an interface by implementing its methods. There is no explicit declaration of intent, no "implements" keyword.
- Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement.

```go
package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser

	// In the following line, v is a Vertex (not *Vertex)
	// and does NOT implement Abser.
	a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

**Type assertion**

```go
package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	f = i.(float64) // panic
	fmt.Println(f)
}
```

**Type switch**

```go
package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```

##### Errors

```go
package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s", e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
```

##### Readers

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
```

##### Images

```go
package main

import (
	"fmt"
	"image"
)

func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
```

##### Goroutines

`// runs say() in a separate thread`
`go say("hello")`


```go
package main

import "fmt"

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

- `ch := make(chan int, 100)` <-- make a buffered channel of length 100
- `v, ok := <-ch` ok == true if the channel is still open
- The select statement lets a goroutine wait on multiple communication operations.
- A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.


```go
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

**sync.Mutex**

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mux.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mux.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}

  ```

How to write go code: https://golang.org/doc/code.html
Documentation: https://golang.org/doc/
Examples (functions): https://golang.org/doc/codewalk/functions/
Go blog: https://blog.golang.org/
Go examples: https://golangbot.com/page/2/




<!-- end -->
