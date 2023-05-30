function getDistance(x1, y1, x2, y2) {
  if (arguments.length < 4) {
    throw new Error('Отсутствует аргумент');
  }
  for (let i = 0; i < arguments.length; i++) {
    if (
      typeof arguments[i] !== 'number' ||
      arguments[i] < -1000 ||
      arguments[i] > 1000
    ) {
      throw new Error('Аргумент не соответствует условиям');
    }
  }
  let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  if (distance % 1 === 0) {
    return distance;
  }
  return distance.toFixed(2);
}

function switchPlaces(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Аргумент не является массивом');
  }
  if (arr.length === 0) {
    return arr;
  }
  const middleIndex = arr.length / 2;
  if (arr.length % 2 === 0) {
    return arr.slice(middleIndex).concat(arr.slice(0, middleIndex));
  } else {
    return arr
      .slice(middleIndex + 1)
      .concat(arr.slice(middleIndex, middleIndex + 1))
      .concat(arr.slice(0, middleIndex));
  }
}

function getDivisors(number) {
  if (
    typeof number !== 'number' ||
    !Number.isFinite(number) ||
    Number.isNaN(number)
  ) {
    throw new Error('Невалидное число');
  }

  if (number <= 0) {
    throw new Error('Число должно быть положительным');
  }

  const divisors = [];
  for (let i = number; i > 0; i--) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}
