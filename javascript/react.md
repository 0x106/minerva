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


**Monday 26 November**

Simple example demonstrating `mapDispatchToProps`

```javascript
// https://gist.github.com/markerikson/121c77a01c453466361a9c6434a08620  
import { action } from "myActions";
import { connect } from "react-redux";

const mapStateToProps = (state) = {
    return {
        counter : state.counter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        performAction : () => dispatch( action() )
    }
};

const MyStatelessComponent = (props) => {
    const { counter } = props;
    const { performAction } = props;

    return (
        <div>
            <div>Counter: {counter}</div>
            <button onClick={performAction}>First Button</button>
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )(MyStatelessComponent)
```

Simple example demonstrating an action creator

```javascript
let action = {
  type: 'CREATE_ACTION'
  name: 'simple object action'
}

let createAction = ( name ) => {
  return {
    type: 'CREATE_ACTION'
    name: name
  }
}

store.dispatch( action )
store.dispatch( createAction('action1') )
```

**A tiny Redux implementation**

```javascript
function createStore(reducer, preloadedState) {
    let state = preloadedState;
    const listeners = [];

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    dispatch({type: '@@redux/INIT'});

    return { dispatch, subscribe, getState };
}

function mapValues(obj, fn) {
    return Object.keys(obj).reduce((result, key) => {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}

function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args));
}

export function bindActionCreators(actionCreators, dispatch) {
    return typeof actionCreators === 'function' ?
        bindActionCreator(actionCreators, dispatch) :
        mapValues(actionCreators, actionCreator =>
            bindActionCreator(actionCreator, dispatch)
        );
}

export function combineReducers(reducers) {
    return (state = {}, action) => mapValues(reducers,
        (reducer, key) => reducer(state[key], action)
    );
}
```
