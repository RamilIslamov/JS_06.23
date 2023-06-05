function makeDeepCopy(obj) {
  const prohibitedTypes = ['number', 'string', 'boolean', 'symbol', 'bigint'];
  const type = typeof obj;
  if (Array.isArray(obj) || obj == null || prohibitedTypes.includes(type)) {
    throw new Error();
  }
  const copy = {};

  function makeDeepCopyArray(arr) {
    const copyArr = arr.map((element) => {
      if (Array.isArray(element)) {
        return makeDeepCopyArray(element);
      }
      if (typeof element === 'object' && !Array.isArray(element)) {
        return makeDeepCopy(element);
      } else {
        return element;
      }
    });

    return copyArr;
  }

  for (let prop in obj) {
    if (Array.isArray(obj[prop])) {
      copy[prop] = makeDeepCopyArray(obj[prop]);
    } else if (obj[prop] instanceof Map) {
      copy[prop] = new Map();
      for (let [key, value] of obj[prop]) {
        if (typeof key === 'object' || (Array.isArray(key) && key !== null)) {
          copy[prop].set(makeDeepCopy(key), value);
        } else {
          copy[prop].set(key, value);
        }
      }
    } else if (obj[prop] instanceof Set) {
      copy[prop] = new Set([...obj[prop]]);
    } else if (
      typeof obj[prop] === 'object' &&
      obj[prop] !== null &&
      !Array.isArray(obj[prop])
    ) {
      copy[prop] = makeDeepCopy(obj[prop]);
    } else {
      copy[prop] = obj[prop];
    }
  }
  return copy;
}

function createIterable(from, to) {
  if (
    isNaN(from) ||
    isNaN(to) ||
    !isFinite(from) ||
    !isFinite(to) ||
    !Number.isInteger(from) ||
    !Number.isInteger(to) ||
    typeof from !== 'number' ||
    typeof to !== 'number' ||
    to <= from
  ) {
    throw new Error();
  }
  let currentVal = from;

  return {
    [Symbol.iterator]: function () {
      return {
        next() {
          if (currentVal <= to) {
            return { done: false, value: currentVal++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };
}

function createProxy(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj == null) {
    throw new Error();
  }

  const objProxyHandler = {
    get: function (target, prop) {
      if (prop in target) {
        if (target[prop] && typeof target[prop] === 'object') {
          target[prop].readAmount = (target[prop].readAmount || 0) + 1;
        } else {
          target[prop] = {
            value: target[prop],
            readAmount: 1,
          };
        }
      }
      return target[prop];
    },
    set: function (target, prop, val) {
      if (!(prop in target)) {
        target[prop] = {
          value: val,
          readAmount: 0,
        };
        return true;
      }
      if (target[prop] && typeof target[prop] === 'object') {
        if (typeof val === typeof target[prop].value) {
          target[prop].value = val;
        } else {
          if (typeof val === typeof target[prop]) {
            target[prop] = { ...target[prop], value: val, readAmount: 0 };
          }
        }
      }
      return true;
    },
  };

  return new Proxy(obj, objProxyHandler);
}
