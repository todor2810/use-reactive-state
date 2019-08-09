import {useState} from 'react';

let cache = Symbol('cache');

function useReactiveState(initialState) {
  let [state, setState] = useState(initialState);
  let stateCopy = {...state};

  return new Proxy(stateCopy, {
    // Recursively proxify 'stateCopy'
    get(target, key) {
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
      let status = Reflect.set(target, key, value); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    },
    defineProperty(target, key, descriptor) {
      let status = Reflect.defineProperty(target, key, descriptor); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    },
    deleteProperty(target, key) {
      let status = Reflect.deleteProperty(target, key); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setState(stateCopy); // call 'setState' with the updated 'stateCopy'

      return status;
    }
  });
}

export default useReactiveState;
