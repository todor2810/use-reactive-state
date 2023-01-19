`useReactiveState()` - a reactive alternative to React's `useState()`

---

## Installation

```
$ npm install use-reactive-state
```

## Example

<table>
<tr>
<th>useState()</th>
<th>useReactiveState()</th>
</tr>
<tr>
<td valign="top">

```javascript
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

</td>
<td valign="top">

```javascript
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

</td>
</tr>
</table>

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
