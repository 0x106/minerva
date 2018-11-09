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
