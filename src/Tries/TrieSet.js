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
    word = word.toUpperCase();
    let newNode,
      act = this;
    for (let e of word) {
      newNode = new TrieSet(e, false);
      if (!act.hijos.has(newNode)) {
        act.hijos.add(newNode);
        act = newNode;
      } else act = act.hijos.getE(newNode);
    }
    newNode.fin = true;
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
