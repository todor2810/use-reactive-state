import {useState} from 'react';

// The type assertion is a workaround
// because TypeScript doesn't support
// symbols as object keys yet
const cache = Symbol('cache') as any;

interface InitialState {
  [key: string]: any;
}

function useReactiveState(initialState: InitialState) {
  const [state, setState] = useState(initialState);
  const stateCopy = {...state};

  return new Proxy(stateCopy, {
    // Recursively proxify 'stateCopy'
    get(target, key: string | number) {
      if (
        // if the property is any kind of object (object, array, function)
        typeof target[key] === 'object'
          && target[key] !== null
          || typeof target[key] === 'function'
      ) {
        if (!target[cache]) {
          target[cache] = {};
        }
        if (!target[cache][key]) {
          target[cache][key] = new Proxy(target[key], this);
        }
        return target[cache][key];
      } else {
        return Reflect.get(target, key); // default behavior
      }
    },
    set(target, key, value) {
      const status = Reflect.set(target, key, value); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    },
    defineProperty(target, key, descriptor) {
      const status = Reflect.defineProperty(target, key, descriptor); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    },
    deleteProperty(target, key) {
      const status = Reflect.deleteProperty(target, key); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    }
  });
}

export default useReactiveState;
