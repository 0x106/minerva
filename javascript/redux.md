### Redux

1. [Dan Abramov tutorial](https://egghead.io/lessons/react-redux-the-single-immutable-state-tree)
2. [Redux examples](https://redux.js.org/introduction/examples)

The key principle behind Redux is the idea of a single object that manages state for the entire application.
The *store*:
- Holds application state;
- Allows access to state via `getState();`
- Allows state to be updated via `dispatch(action);`
- Registers listeners via `subscribe(listener);`
- Handles unregistering of listeners via the function returned by `subscribe(listener);`.

The store is created from *reducers*, which are functions that describe how the *state* should change in reponse to an *action*

"Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes."

**Simple example demonstrating `mapDispatchToProps`**

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

**Simple example demonstrating an action creator**

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
// https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/store-api.html#/11
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
