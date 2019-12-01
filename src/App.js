// bring in Suspense (to handle asynchrony)
import React, { useState, Suspense } from "react";
import fetchPokemon from "./fetch-pokemon";

// Cache to keep track of pokemon already loaded
const cache = {};

function PokemonInfo({ pokemonName }) {
  const pokemon = cache[pokemonName];
  // THROW promise; React find closest Suspense and uses its fallback. When promise is resolved, Suspense will rerender its children
  if (!pokemon) {
    const promise = fetchPokemon(pokemonName).then(
      p => (cache[pokemonName] = p)
    );
    console.log("cache", cache);
    throw promise;
  }
  return <pre>{JSON.stringify(pokemon || "Unknown", null, 2)}</pre>; //<pre/> preformatted html, preserves the whitespace
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
        {pokemonName ? (
          // Suspense wrapper with fallback "loading..."
          <Suspense fallback={<div>loading...</div>}>
            <PokemonInfo pokemonName={pokemonName} />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}

export default App;
