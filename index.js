class Stack {
  constructor(stackLimit = 10) {
    if (
      typeof stackLimit !== 'number' ||
      !Number.isInteger(stackLimit) ||
      stackLimit <= 0
    ) {
      throw new Error('Invalid limit value');
    }
    this.stackLimit = stackLimit;
    this.stack = {};
    this.currLenght = 0;
  }

  push(elem) {
    if (this.currLenght + 1 > this.stackLimit) {
      throw new Error('Limit exceeded');
    }
    this.stack[this.currLenght] = elem;
    this.currLenght++;
  }

  pop() {
    if (this.currLenght === 0) {
      throw new Error('Empty stack');
    }
    const deletedVal = this.stack[this.currLenght - 1];
    delete this.stack[this.currLenght - 1];
    this.currLenght--;
    return deletedVal;
  }

  peek() {
    if (this.currLenght === 0) {
      return null;
    }
    return this.stack[this.currLenght - 1];
  }
  isEmpty() {
    if (this.currLenght === 0) {
      return true;
    }
    return false;
  }
  toArray() {
    const arrayStack = [];
    for (let prop in this.stack) {
      arrayStack.push(this.stack[prop]);
    }
    return arrayStack;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable');
    }
    const stack = new Stack();
    if (iterable.length) {
      stack.stackLimit = iterable.length;
    } else {
      stack.stackLimit = iterable.size;
    }

    for (let item of iterable) {
      stack.push(item);
    }
    return stack;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  #createNewNode(elem) {
    return {
      element: elem,
      next: null,
    };
  }

  append(elem) {
    const newNode = this.#createNewNode(elem);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(elem) {
    const newNode = this.#createNewNode(elem);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const prevHead = this.head;
      this.head = newNode;
      this.head.next = prevHead;
    }
  }
  find(elem) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.element === elem) {
        return currentNode.element;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  toArray() {
    const listArray = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      listArray.push(currentNode.element);
      currentNode = currentNode.next;
    }
    return listArray;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable');
    }
    const list = new LinkedList();

    for (let item of iterable) {
      list.append(item);
    }
    return list;
  }
}

class Car {
  constructor() {}
  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;

  #maxSpeed = 100;
  #maxLimitSpeed = 330;

  #maxFuelVolume = 20;
  #maxLimitFuelVolume = 100;

  #fuelConsumption = 1;

  #damage = 1;
  #damageLimit = 5;

  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  get brand() {
    return this.#brand;
  }

  set brand(str) {
    if (typeof str !== 'string' || !str.length || str.length > 50) {
      throw new Error('Invalid brand name');
    }
    this.#brand = str;
  }

  get model() {
    return this.#model;
  }

  set model(str) {
    if (typeof str !== 'string' || !str.length || str.length > 50) {
      throw new Error('Invalid model name');
    }
    this.#model = str;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    const firstYear = this.#yearOfManufacturing;
    const currYear = new Date().getFullYear();
    if (
      typeof year !== 'number' ||
      !Number.isInteger(year) ||
      year < firstYear ||
      year > currYear
    ) {
      throw new Error('Invalid year of manufacturing');
    }
    this.#yearOfManufacturing = year;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(num) {
    const min = this.#maxSpeed;
    const max = this.#maxLimitSpeed;
    if (
      typeof num !== 'number' ||
      !Number.isInteger(num) ||
      num < min ||
      num > max
    ) {
      throw new Error('Invalid max speed');
    }
    this.#maxSpeed = num;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(liter) {
    const min = this.#maxFuelVolume;
    const max = this.#maxLimitFuelVolume;
    if (
      typeof liter !== 'number' ||
      !Number.isInteger(liter) ||
      liter < min ||
      liter > max
    ) {
      throw new Error('Invalid max fuel volume');
    }
    this.#maxFuelVolume = liter;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(num) {
    const min = this.#fuelConsumption;
    if (typeof num !== 'number' || !Number.isInteger(num) || num < min) {
      throw new Error('Invalid fuel consumption');
    }
    this.#fuelConsumption = num;
  }

  get damage() {
    return this.#damage;
  }

  set damage(num) {
    const min = this.#damage;
    const max = this.#damageLimit;
    if (
      typeof num !== 'number' ||
      !Number.isInteger(num) ||
      num < min ||
      num > max
    ) {
      throw new Error('Invalid damage');
    }
    this.#damage = num;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  get health() {
    return this.#health;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car has already started');
    }
    this.#isStarted = !this.#isStarted;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    }
    this.#isStarted = !this.#isStarted;
  }

  fillUpGasTank(fuelAmount) {
    if (
      typeof fuelAmount !== 'number' ||
      !Number.isInteger(fuelAmount) ||
      fuelAmount < 0
    ) {
      throw new Error('Invalid fuel amount');
    }
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    const sumFuelVolume = fuelAmount + this.#currentFuelVolume;
    if (sumFuelVolume > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    }
    this.#currentFuelVolume = sumFuelVolume;
  }

  drive(speed, hours) {
    if (typeof speed !== 'number' || !Number.isInteger(speed) || speed <= 0) {
      throw new Error('Invalid speed');
    }
    if (typeof hours !== 'number' || !Number.isInteger(hours) || hours <= 0) {
      throw new Error('Invalid duration');
    }
    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }
    if (!this.#isStarted) {
      throw new Error('You have to start your car first');
    }
    const estimatedFuelConsump = this.#fuelConsumption * hours;
    if (this.#currentFuelVolume - estimatedFuelConsump < 0) {
      throw new Error("You don't have enough fuel");
    }
    const estimatedDamage = ((speed * hours) / 100) * this.#damage;
    if (this.#health - estimatedDamage < 0) {
      throw new Error("Your car won't make it");
    }
    this.#currentFuelVolume = this.#currentFuelVolume - estimatedFuelConsump;
    this.#health = (this.#health - estimatedDamage).toFixed(1);
    this.#mileage = this.#mileage + speed * hours;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.#currentFuelVolume !== this.#maxFuelVolume) {
      throw new Error('You have to fill up your gas tank first');
    }
    this.#health = 100;
  }

  getFullAmount() {
    if (this.#currentFuelVolume === this.#maxFuelVolume) {
      return 0;
    }
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
