import { TreeSet } from "../structs/TreeSet.js";

export class TrieSet {
  constructor(value = "", fin = false) {
    this.value = value;
    this.fin = fin;
    this.hijos = new TreeSet(
      (a, b) => (a.value - b.value < 0 ? 1 : 0),
      (a, b) => a.value === b.value,
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
}
