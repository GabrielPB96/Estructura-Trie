const ascii = (e) => e.charCodeAt(0);

export class TrieTUAD {
  constructor(value = "", fin = false) {
    this.fin = fin;
    this.value = value;
    this.toad = new Array(25).fill(null);
  }

  insert(cad) {
    cad = cad.toUpperCase();
    let pos = -1;
    let act = this;
    for (let e of cad) {
      pos = ascii(e) - 65;
      if (act.toad[pos] === null) {
        act.toad[pos] = new TrieTUAD(e);
      }
      act = act.toad[pos];
    }
    if (pos !== -1) {
      act.fin = true;
    }
  }

  toString(current = [], res = []) {
    for (let o of this.toad) {
      if (o !== null) {
        current.push(o.value);
        if (o.fin) {
          res.push([...current]);
          //console.log(...current);
        }
        o.toString(current, res);
      }
    }
    current.pop();
    return res;
  }

  search(cad) {
    cad = cad.toUpperCase();
    let t = cad.length,
      pos,
      act = this;
    for (let e of cad) {
      pos = ascii(e) - 65;
      if (act.toad[pos] !== null) {
        t--;
      }
      act = act.toad[pos];
      if (t === 0) {
        return act.fin;
      }
    }
    return false;
  }
}
