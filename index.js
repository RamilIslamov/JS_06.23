Array.prototype.customFilter = customFilter;

function customFilter(callBack, thisArg) {
  if (
    typeof callBack !== 'function' ||
    (thisArg && typeof thisArg !== 'object')
  ) {
    throw new Error('Invalid argument.');
  }

  const filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callBack.call(thisArg, this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
}

function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid argument.');
  }
  if (arr.length === 0) {
    return [];
  }
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    if (typeof newArr[i] !== 'number' || !isFinite(newArr[i])) {
      throw new Error('Invalid argument.');
    }
  }
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i + 1] < newArr[i]) {
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return newArr;
}

function storageWrapper(callBackFn, arr) {
  if (typeof callBackFn !== 'function') {
    throw new Error('Invalid argument.');
  }
  if (!Array.isArray(arr) && arr !== undefined) {
    throw new Error('Invalid argument.');
  }
  const storage = [];

  return function () {
    if (arr === undefined) {
      const res = callBackFn();
      storage.push(res);
      return storage;
    } else {
      const res = callBackFn();
      arr.push(res);
      return arr;
    }
  };
}
