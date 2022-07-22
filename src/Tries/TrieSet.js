import { TreeSet } from "../structs/TreeSet.js";
import { ascii } from "../funciones.js";

export class TrieSet {
  constructor(value = "", fin = false) {
    this.value = value;
    this.fin = fin;
    this.hijos = new TreeSet(
      (a, b) => (ascii(a.value) - ascii(b.value) < 0 ? 1 : 0),
      (a, b) => ascii(a.value) === ascii(b.value),
      true
    );
  }

  insert(word) {
    this.valid(word);
    let newNode, node;
    if (word.length === 0) {
      this.fin = true;
    } else {
      newNode = new TrieSet(word[0].toUpperCase());
      if (!this.hijos.has(newNode)) {
        this.hijos.add(newNode);
      }
      node = this.hijos.getE(newNode);
      node.insert(word.slice(1, word.length));
    }
  }

  contains(word) {
    this.valid(word);
    if (word.length === 0) return this.fin;
    let node = this.hijos.getE(new TrieSet(word[0].toUpperCase()));
    if (node) {
      return node.contains(word.slice(1, word.length));
    } else return false;
  }

  isPreFix(prefix, word) {
    this.valid(prefix, word);
    if (prefix.length === 0) {
      return this.contains(word);
    } else {
      let node = this.hijos.getE(new TrieSet(prefix[0].toUpperCase()));
      if (node) {
        prefix = prefix.slice(1, prefix.length);
        word = word.slice(1, word.length);
        return node.isPreFix(prefix, word);
      } else return false;
    }
  }

  valid(...word) {
    for (let w of word) {
      if (typeof w !== "string") throw Error(`${w} is not of type string`);
    }
  }

  words(current = [], res = []) {
    this.hijos.forEach((e) => {
      current.push(e.value);
      if (e.fin) {
        let word = current.toString().replaceAll(",", "");
        res.push(word);
      }
      e.words(current, res);
    });
    current.pop();
    return res;
  }
}
