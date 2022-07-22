import { TreeSet } from "./TreeSet.js";

export class Trie2 {
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
      newNode = new Trie2(e, false);
      if(!act.hijos.has(newNode)) {
        act.hijos.add(newNode);
        act = newNode;
      }else act = act.hijos.getE(newNode);
    }
    newNode.fin = true;
  }
}
