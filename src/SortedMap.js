import { ascii } from "./funciones.js";

/**
 * comparator(a, b), retorna 1 si "a" es menor a "b", 0 en otros casos
 */
export class SortedMap {
  constructor(comparator, equals) {
    if (!comparator) this.comparator = (a, b) => (a - b < 0 ? 1 : 0);
    else this.comparator = comparator;

    if (!equals) this.equals = (a, b) => a === b;
    else this.equals = equals;

    this.elements = [];
    this.tam = 0;
  }

  get size() {
    return this.tam;
  }

  set(key, value) {
    let pos = this.binarySearch(key);

    if (this.elements[pos] && !this.comparator(key, this.elements[pos].key))
      pos++;

    let left = this.elements.slice(0, pos);
    let right = this.elements.slice(pos, this.tam);
    this.elements = left.concat([{ key, value }], right);
    this.tam++;
  }

  get(key) {
    try {
      let pos = this.binarySearch(key);
      if (this.equals(this.elements[pos].key, key)) {
        return this.elements[pos].value;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  has(key) {
    try {
      let pos = this.binarySearch(key);
      if (this.elements[pos]) return this.equals(this.elements[pos].key, key);
      return false;
    } catch (e) {
      return false;
    }
  }

  forEach(callback) {
    for (let o of this.elements) {
      callback(o.value, o.key);
    }
  }

  binarySearch(key) {
    let a = 0,
      b = this.elements.length - 1,
      mid;

    while (a < b) {
      mid = Math.floor((a + b) / 2);
      let vM = this.elements[mid].key;
      if (this.comparator(vM, key)) {
        a = mid + 1;
      } else {
        b = mid;
      }
    }
    return a;
  }

  toString() {
    let report = "";
    for (let o of this.elements) {
      report += "(" + o.key + "," + o.value + ") ";
    }
    return report;
  }
}

const comparator = (a, b) => {
  a = ascii(a);
  b = ascii(b);
  return a - b < 0 ? 1 : 0;
};

const obj = new SortedMap(comparator);
obj.set("P", 13);
obj.set("A", 15);
obj.set("N", 15);
obj.set("T", 14);
obj.set("O", 144);
obj.set("J", 14);
obj.set("A", 14);
/*console.log(obj.toString());
console.log(obj.size);
console.log(obj.get('P'));
console.log(obj.has('N'))*/
