**Monday 21 November**

1. `Static` methods defined on a class, not an instance - fairly standard.
2. `setState` takes two parameters: the function (i.e object) to update the state
    and an optional callback function. The callback is used because `setState` is
    not guaranteed to execute immediately.
3. `React.Children` contains various functionality to deal with child objects
    of components.
4. `React.Children.map( children, function[(thisArg)])` returns a new array,
    mapped over the children of the current component. Inside the `function` `this`
    will refer to the current component.
5. `Context`: ["Context provides a way to share values like these between components
    without having to explicitly pass a prop through every level of the tree."](https://reactjs.org/docs/context.html)
    --> Need to set the context type for a component using
    `(() => {}).contextTypes = {}`
6. Use `componentDidMount` and `componentWillUnmount` lifecycle methods to initialise
   and tear-down components.
