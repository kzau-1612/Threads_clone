import { createFileRoute, Link } from "@tanstack/react-router";
import { getPokemonList } from "../../services/pokemon";

export const Route = createFileRoute("/pokemon/")({
  component: PokemonList,
  loader: getPokemonList,
});

function PokemonList() {
  const pokemons = Route.useLoaderData();
  return (
    <div>
      <h2>Pokemons</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link to={`/pokemon/$id`} params={{ id: pokemon.id }}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
