import React, { useState } from "react";
import fetchPokemon from "./fetch-pokemon";

const cache = {};

function PokemonInfo({ pokemonName }) {
  const pokemon = cache[pokemonName];
  return <pre>{JSON.stringify(pokemon || "Unknown", null, "___")}</pre>;
}

function App() {
  const [pokemonName, setPokemonName] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setPokemonName(e.target.elements.pokemonName.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">Pokemon Name (ie. Pikachu)</label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {pokemonName ? <PokemonInfo pokemonName={pokemonName} /> : null}
      </div>
    </div>
  );
}

export default App;
