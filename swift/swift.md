# Swift

**Create a new command line app**

https://medium.com/quick-code/lets-build-a-command-line-app-in-swift-328ce274f1cc

1. `mkdir <proj>`
2. `cd <proj>`
3. `swift package init --type executable`
4. `swift build`
5. `swift package generate-xcodeproj`

### Swift Interview Questions

1. How does Swift handle memory management?

The _reference count_ refers to the number of objects that maintain a strong
reference to an instance of a _reference type_ (such as an instance of a class).
Reference counts are automatically increased / decreased, and memory is deallocated
when the reference count reaches zero. - called ARC.


_Strong reference cycles_ occur when two class instances hold references to each other.
I.e:

```swift
class A {
  var _b: B?
}

class B {
  var _a: A?
}

let a = A()
let b = B()

a._b = b
b._a = a // strong reference cycle has been created
```

1. https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html
2. https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID52

To resolve strong reference cycles use _weak_ and _unowned_ references. These allow
one of the instances in the reference cycle to refer to other without keeping a strong
reference to it.

- Weak: When the _other_ instance likely has a shorter lifespan
- Unowned: When the _other_ instance likely has the same or longer lifespan


**Reference cycles in closure blocks**

```swift

class Foo {

  var sum = 0

  func bar() {

    // Here, self owns the closure, and the closure owns self, so there is a reference cycle.
    self.someAsyncFunction() { result in
      self.sum += result
    }

  }

}

```
