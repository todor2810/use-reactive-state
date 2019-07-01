`useStore()` - a reactive alternative to React's `useState()`

## Installation

```
$ npm install use-store
```

## Example

```javascript
// with useState()

import React, {useState} from 'react';

function Counter() {
  let [store, setStore] = useState({count: 0});

  return (
    <div>
      <p>You clicked {store.count}</p>
      <button onClick={function () {
        setStore({
          ...store,
          count: store.count + 1
        });
      }}>
        Click me
      </button>
    </div>
  );
}
```

```javascript
// with useStore()

import React from 'react';
import useStore from 'use-store';

function Counter() {
  let store = useStore({count: 0});

  return (
    <div>
      <p>You clicked {store.count} times</p>
      <button onClick={function () { store.count += 1; }}>
        Click me
      </button>
    </div>
  );
}
```

## Limitations of `useStore()`

- `store` has to be an object:

```javascript
// This won't work
let count = useStore(0);
```

```javascript
// This will work
let store = useStore({count: 0});
```

- `store` cannot be destructured:

```javascript
// This won't work
let {count} = useStore({count: 0});
```

```javascript
// This will work
let store = useStore({count: 0});
```
