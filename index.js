import {useState} from 'react';

let cache = Symbol('cache');

function useStore(initialStore) {
  let [store, setStore] = useState(initialStore);
  let storeCopy = {...store};

  return new Proxy(storeCopy, {
    // Recursively proxify 'storeCopy'
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
      setStore(storeCopy); // call 'setStore' with the updated 'storeCopy'

      return status;
    },
    defineProperty(target, key, descriptor) {
      let status = Reflect.defineProperty(target, key, descriptor); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setStore(storeCopy); // call 'setStore' with the updated 'storeCopy'

      return status;
    },
    deleteProperty(target, key) {
      let status = Reflect.deleteProperty(target, key); // default behavior

      if (target[cache] && target[cache][key]) {
        delete target[cache][key];
      }
      setStore(storeCopy); // call 'setStore' with the updated 'storeCopy'

      return status;
    }
  });
}

export default useStore;
