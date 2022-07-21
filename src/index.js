import "./styles.css";
import { TrieMap } from "./TrieMap.js";

const pokemons = new TrieMap();

let $campo, $op, $search;
let POKEMONS = [];
function getPokemon(id) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((res) => res.json())
    .then((poke) => {
      let name = poke.species.name;
      let img = poke.sprites.back_default;
      POKEMONS.push({ name, img });
    });
}
function generarPokemons() {
  let ids = [];
  for (let i = 1; i <= 100; i++) ids.push(i);
  return Promise.all(ids.map((id) => getPokemon(id)));
}

function llenarDataBase() {
  for (let poke of POKEMONS) {
    pokemons.insert(poke.name);
  }
}

function getUrlPoke(name) {
  for (let p of POKEMONS) {
    if (p.name === name.toLowerCase()) {
      return p.img;
    }
  }
}

function renderDataBase() {
  let data = pokemons.toString();
  let $f = document.createDocumentFragment();
  let $ul = document.createElement("ol");
  for (let o of data) {
    let nameR = o.toString().replaceAll(",", "");
    let $li = document.createElement("li");
    let $img = document.createElement("img");
    let $paP = document.createElement("p");
    $img.src = getUrlPoke(nameR);
    $paP.textContent = `${nameR}`;
    $li.append($paP);
    $li.append($img);
    $ul.append($li);
  }

  $f.append($ul);
  $op.append($f);
}

function search() {
  $op.innerHTML = "";
  let $frag = document.createDocumentFragment();
  let $ol = document.createElement("ol");
  if ($campo.value === "") return;
  let opc = pokemons.wordsPre($campo.value);
  for (let o of opc) {
    let nameR = o.toString().replaceAll(",", "");
    let $li = document.createElement("li");
    let $img = document.createElement("img");
    let $paP = document.createElement("p");
    $img.setAttribute("src", getUrlPoke(nameR));
    $paP.textContent = `${nameR}`;
    $li.append($paP);
    $li.append($img);
    $ol.append($li);
  }
  $frag.append($ol);
  $op.append($frag);
}

function init() {
  generarPokemons().then(() => {
    llenarDataBase();
    renderDataBase();
  });

  $campo = document.getElementById("campo");
  $op = document.getElementById("opciones");
  $search = document.getElementById("search");
  $search.addEventListener("click", search);
}

window.addEventListener("load", init());
