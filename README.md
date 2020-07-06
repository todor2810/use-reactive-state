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

function Counter() {
  const state = useReactiveState({count: 0});

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={() => { state.count += 1; }}>
        Click me
      </button>
    </div>
  );
}
```

```javascript
// 'useState()' example
// Interactive demo: https://codesandbox.io/s/gifted-glade-hp0pi

function Counter() {
  const [state, setState] = useState({count: 0});

  return (
    <div>
      <p>You clicked {state.count}</p>
      <button onClick={() => {
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

## Limitation of `useReactiveState()`

- `state` cannot be destructured:

```javascript
// This won't work
const {count} = useReactiveState({count: 0});
```

```javascript
// This will work
const state = useReactiveState({count: 0});
```
