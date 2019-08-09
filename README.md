`useReactiveState()` - a reactive alternative to React's `useState()`

---

## Installation

```
$ npm install use-reactive-state
```

## Example

```javascript
// 'useReactiveState()' example
// Interactive demo: https://codesandbox.io/s/busy-khorana-euf58

import React from 'react';
import useReactiveState from 'use-reactive-state';

function Counter() {
  let state = useReactiveState({count: 0});

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={function () { state.count += 1; }}>
        Click me
      </button>
    </div>
  );
}
```

```javascript
// 'useState()' example
// Interactive demo: https://codesandbox.io/s/gifted-glade-hp0pi

import React, {useState} from 'react';

function Counter() {
  let [state, setState] = useState({count: 0});

  return (
    <div>
      <p>You clicked {state.count}</p>
      <button onClick={function () {
        setState({
          ...state,
          count: state.count + 1
        });
      }}>
        Click me
      </button>
    </div>
  );
}
```

## Type definition of `useReactiveState()`

```typescript
interface InitialState {
  [key: string]: any;
}

interface State {
  [key: string]: any;
}

declare function useReactiveState(initialState: InitialState): InitialState | State;
```

## Limitation of `useReactiveState()`

- `state` cannot be destructured:

```javascript
// This won't work
let {count} = useReactiveState({count: 0});
```

```javascript
// This will work
let state = useReactiveState({count: 0});
```
