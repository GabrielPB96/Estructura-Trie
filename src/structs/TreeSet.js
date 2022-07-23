export class TreeSet {
  constructor(comparator, equals, repeat = false) {
    this.elements = [];
    this.repeat = repeat;
    this.tam = 0;
    if (!comparator) this.comparator = (a, b) => (a - b < 0 ? 1 : 0);
    else this.comparator = comparator;

    if (!equals) this.equals = (a, b) => a === b;
    else this.equals = equals;
  }

  get size() {
    return this.tam;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get(pos) {
    return this.elements[pos];
  }

  getE(value) {
    if (!this.has(value)) return null;
    let pos = this.binarySearch(value);
    return this.elements[pos];
  }

  get values() {
    return this.elements;
  }

  has(value) {
    let pos = this.binarySearch(value);
    return this.elements[pos] && this.equals(this.elements[pos], value);
  }

  delete(value) {
    if (!this.has(value)) return null;
    let pos = this.binarySearch(value);
    let left = this.elements.slice(0, pos);
    let right = this.elements.slice(pos + 1, this.size);
    this.elements = left.concat(right);
    this.tam--;
  }

  add(value) {
    let pos = this.binarySearch(value);
    if (
      this.repeat &&
      this.elements[pos] &&
      this.equals(this.elements[pos], value)
    )
      return;
    if (this.elements[pos] && !this.comparator(value, this.elements[pos])) {
      pos++;
    }

    let left = this.elements.slice(0, pos);
    let right = this.elements.slice(pos, this.size);
    this.elements = left.concat([value], right);
    this.tam++;
  }

  forEach(callback) {
    for (let e of this.elements) {
      callback(e);
    }
  }

  *[Symbol.iterator]() {
    let i = 0;
    let value;
    while (i < this.size) {
      value = this.elements[i];
      yield value;
      i++;
    }
  }

  binarySearch(value) {
    let a = 0,
      b = this.size - 1,
      mid;

    while (a < b) {
      mid = Math.floor((a + b) / 2);
      let vM = this.elements[mid];
      if (this.comparator(vM, value)) {
        a = mid + 1;
      } else {
        b = mid;
      }
    }

    return a;
  }
}
