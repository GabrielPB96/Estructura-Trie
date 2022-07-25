import { TreeSet } from "../structs/TreeSet.js";
import { ascii } from "../funciones.js";

const comparator = (a, b) => (ascii(a.value) - ascii(b.value) < 0 ? 1 : 0);
const equals = (a, b) => ascii(a.value) === ascii(b.value);

export class TrieSet {
  constructor(value = "", fin = false) {
    this.value = value;
    this.fin = fin;
    this.nodes = 0;
    this.hijos = new TreeSet(comparator, equals, true);
  }

  get cantNodes() {
    this.bfs();
    return this.nodes;
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

  delete(word) {
    this.valid(word);
    //if (!this.contains(word)) return;
    word = word.toUpperCase();
    let nodeD = this,
      nodeE,
      nodeA = this;
    for (let i = 0; i < word.length; i++) {
      let w = word[i];
      let node = nodeA.hijos.getE(new TrieSet(w));
      if (node) {
        nodeA = node;
        if (node.hijos.size > 1) {
          nodeD = node;
          nodeE = nodeD.hijos.getE(new TrieSet(word[i + 1]));
        }
      } else return;
    }
    if (nodeA.hijos.isEmpty) {
      nodeD.hijos.delete(nodeE);
    } else {
      nodeA.fin = false;
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

  wordsPreFix(prefix) {
    let node = this;
    for (let c of prefix) {
      let nodeC = node.hijos.getE(new TrieSet(c.toUpperCase()));
      if (nodeC) {
        node = nodeC;
      } else return;
    }
    prefix = prefix.toUpperCase();
    return node.words(Array.from(prefix));
  }

  get isEmpty() {
    return this.value === "";
  }

  bfs() {
    let report = [];
    let queue = [];
    let vis = new TreeSet(
      (a, b) => (ascii(a.value) - ascii(b.value) < 0 ? 1 : 0),
      (a, b) => ascii(a.value) === ascii(b.value)
    );
    queue.push(this);
    this.nodes = 0;
    while (queue.length > 0) {
      let act = queue.shift();
      report.push(act.value);
      act.hijos.forEach((e) => {
        if (!vis.has(e)) {
          queue.push(e);
          this.nodes++;
        }
      });
    }
    return report;
  }
}
