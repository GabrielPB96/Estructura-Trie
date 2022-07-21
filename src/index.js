import "./styles.css";
import { TrieMap } from "./TrieMap.js";

const pokemons = new TrieMap();

let $campo, $op, $search;
let POKEMONS = [];
function getPokemon(id) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((res) => res.json())
    .then((poke) => {
      POKEMONS.push(poke.species.name);
    });
}
function generarPokemons() {
  let ids = [];
  for (let i = 1; i <= 200; i++) ids.push(i);
  return Promise.all(ids.map((id) => getPokemon(id)));
}

function llenarDataBase() {
  for (let poke of POKEMONS) {
    pokemons.insert(poke);
  }
}

function renderDataBase() {
  let data = pokemons.toString();
  let $f = document.createDocumentFragment();
  let $ul = document.createElement("ol");
  for (let o of data) {
    let $p = document.createElement("li");
    $p.textContent = `${o.toString().replaceAll(",", "")}`;
    $ul.append($p);
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
    let $pa = document.createElement("li");
    $pa.textContent = `${o.toString().replaceAll(",", "")}`;
    $ol.append($pa);
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
