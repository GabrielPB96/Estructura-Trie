import { SortedMap } from "../structs/SortedMap.js";
import { ascii } from "../funciones.js";

export class TrieMap {
  constructor(fin = false) {
    this.fin = fin;
    this.hijos = new SortedMap((a, b) => {
      a = ascii(a);
      b = ascii(b);
      return a - b < 0 ? 1 : 0;
    });
  }

  insert(cad) {
    cad = cad.toUpperCase();
    let act = this;
    for (let i = 0; i < cad.length; i++) {
      let e = cad[i];
      if (!act.hijos.has(e)) act.hijos.set(e, new TrieMap());
      act = act.hijos.get(e);
      if (i === cad.length - 1) act.fin = true;
    }
  }

  find(cad) {
    cad = cad.toUpperCase();
    let act = this;
    for (let e of cad) {
      if (act.hijos.has(e)) {
        act = act.hijos.get(e);
      } else return false;
    }
    return act.fin;
  }

  countPre(pre) {
    pre = pre.toUpperCase();
    let act = this;
    for (let e of pre) {
      if (act.hijos.has(e)) {
        act = act.hijos.get(e);
      } else {
        return 0;
      }
    }
    return act.count();
  }

  findPre(pre) {
    pre = pre.toUpperCase();
    let act = this;
    for (let e of pre) {
      if (act.hijos.has(e)) {
        act = act.hijos.get(e);
      } else {
        return null;
      }
    }
    return act;
  }

  wordsPre(pre) {
    pre = pre.toUpperCase();
    let act = this;
    let current = [];
    for (let e of pre) {
      if (act.hijos.has(e)) {
        current.push(e);
        act = act.hijos.get(e);
      } else {
        act = null;
        break;
      }
    }
    if (act === null) return [];
    let res = [];
    if (act.fin) res.push([...current]);

    return act.wordsPreA(current, res);
  }

  wordsPreA(current, res = []) {
    this.hijos.forEach((v, k) => {
      current.push(k);
      if (v.fin) {
        res.push([...current]);
      }
      v.wordsPreA(current, res);
    });
    current.pop();
    return res;
  }

  count() {
    let c = 0;
    if (this.hijos.size === 0) return 0;
    this.hijos.forEach((v, k) => {
      if (v.fin) c = 1 + v.count();
      else c += v.count();
    });
    return c;
  }

  toString(current = [], res = []) {
    this.hijos.forEach((v, k) => {
      current.push(k);
      if (v.fin) {
        res.push([...current]);
        //console.log(...current);
      }
      v.toString(current, res);
    });
    current.pop();
    return res;
  }
}
